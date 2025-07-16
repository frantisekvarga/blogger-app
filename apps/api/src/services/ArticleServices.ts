import { AppDataSource } from 'libs/database/src/lib/data-source';
import { Article } from 'libs/database/src/lib/entities/article.entity';
import { User } from 'libs/database/src/lib/entities/user.entity';

export class ArticleService {
  private articleRepository = AppDataSource.getRepository(Article);
  private userRepository = AppDataSource.getRepository(User);

  async getArticleById(
    userId: number,
    articleId: number
  ): Promise<Article | null> {
    try {
      return await this.articleRepository.findOne({
        where: {
          id: articleId,
          user_id: userId,
        },
      });
    } catch (error) {
      console.error('Error fetching article by ID:', error);
      throw error;
    }
  }

  async getRecentArticlesByUser(
    userId: number,
    excludeArticleId: number
  ): Promise<Article[]> {
    try {
      const articles = await this.articleRepository
        .createQueryBuilder('article')
        .where('article.user_id = :userId', { userId })
        .andWhere('article.id != :excludeArticleId', { excludeArticleId })
        .andWhere('article.isPublished = :isPublished', { isPublished: true })
        .orderBy('article.published_at', 'DESC')
        .take(5)
        .getMany();

      return articles;
    } catch (error) {
      console.error('Error fetching recent articles:', error);
      throw error;
    }
  }

  async createArticle(
    userId: number,
    data: {
      title: string;
      perex: string;
      imageUrl: string;
      content: string;
      isPublished: boolean;
    }
  ): Promise<Article> {
    try {
      const newArticle = this.articleRepository.create({
        title: data.title,
        perex: data.perex,
        image_url: data.imageUrl,
        content: data.content,
        isPublished: data.isPublished,
        user_id: userId,
      });

      await this.articleRepository.save(newArticle);
      return newArticle;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  }

  async getArticlesByAuthor(
    authorId: number,
    search?: string
  ): Promise<{
    articles: Article[];
    author: User | null;
    total: number;
  }> {
    try {
      const author = await this.userRepository.findOne({
        where: { id: authorId },
      });

      if (!author) {
        return {
          articles: [],
          author: null,
          total: 0,
        };
      }

      const queryBuilder = this.articleRepository
        .createQueryBuilder('article')
        .leftJoinAndSelect('article.author', 'author')
        .where('article.user_id = :authorId', { authorId })
        .andWhere('article.isPublished = :isPublished', { isPublished: true });

      if (search && search.trim()) {
        queryBuilder.andWhere(
          '(article.title ILIKE :search OR article.perex ILIKE :search OR article.content ILIKE :search)',
          { search: `%${search.trim()}%` }
        );
      }

      queryBuilder.orderBy('article.published_at', 'DESC');

      const articles = await queryBuilder.getMany();

      return {
        articles,
        author,
        total: articles.length,
      };
    } catch (error) {
      throw error;
    }
  }

  async getFeaturedArticles(): Promise<Article[]> {
    try {
      const articles = await this.articleRepository.find({
        where: { isPublished: true },
        relations: ['author'],
        order: { published_at: 'DESC' },
        take: 5,
      });

      return articles;
    } catch (error) {
      throw error;
    }
  }

  async getArticleByIdSimple(articleId: number): Promise<Article | null> {
    try {
      const article = await this.articleRepository.findOne({
        where: { id: articleId },
        relations: ['author'],
      });

      return article;
    } catch (error) {
      throw error;
    }
  }

  async getAllArticles(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{
    articles: Article[];
    total: number;
    totalPages: number;
  }> {
    try {
      const queryBuilder = this.articleRepository
        .createQueryBuilder('article')
        .leftJoinAndSelect('article.author', 'author')
        .where('article.isPublished = :isPublished', { isPublished: true });

      if (search && search.trim()) {
        queryBuilder.andWhere(
          '(article.title ILIKE :search OR article.perex ILIKE :search OR article.content ILIKE :search)',
          { search: `%${search.trim()}%` }
        );
      }

      queryBuilder
        .orderBy('article.published_at', 'DESC')
        .skip((page - 1) * limit)
        .take(limit);

      const [articles, total] = await queryBuilder.getManyAndCount();

      return {
        articles,
        total,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async updateArticle(
    articleId: number,
    updates: Partial<
      Pick<Article, 'title' | 'content' | 'image_url' | 'perex' | 'isPublished'>
    >
  ): Promise<Article | null> {
    try {
      const article = await this.articleRepository.findOne({
        where: { id: articleId },
      });

      if (!article) return null;

      const updatedArticle = {
        ...article,
        ...updates,
        updatedAt: new Date(),
      };

      await this.articleRepository.save(updatedArticle);
      return updatedArticle;
    } catch (error) {
      throw error;
    }
  }

  async deleteArticle(articleId: number): Promise<boolean> {
    try {
      const article = await this.articleRepository.findOne({
        where: { id: articleId },
      });

      if (!article) {
        return false;
      }

      await this.articleRepository.remove(article);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getDrafts(
    userId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    articles: Article[];
    total: number;
    totalPages: number;
  }> {
    try {
      const [articles, total] = await this.articleRepository.findAndCount({
        where: {
          user_id: userId,
          isPublished: false,
        },
        relations: ['author'],
        order: { createdAt: 'DESC' },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        articles,
        total,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async publishArticle(articleId: number): Promise<Article | null> {
    try {
      const article = await this.articleRepository.findOne({
        where: { id: articleId },
      });

      if (!article) {
        return null;
      }

      article.isPublished = true;
      article.published_at = new Date();
      article.updatedAt = new Date();

      await this.articleRepository.save(article);
      return article;
    } catch (error) {
      throw error;
    }
  }
}
