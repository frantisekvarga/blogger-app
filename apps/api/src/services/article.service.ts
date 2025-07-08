import { AppDataSource, Article, User } from 'database'

export class ArticleService {
  private articleRepository = AppDataSource.getRepository(Article);
  private userRepository = AppDataSource.getRepository(User);

  async getArticlesByAuthor(authorId: number): Promise<{
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

      const articles = await this.articleRepository.find({
        where: { user_id: authorId },
        relations: ['author'],
        order: { published_at: 'DESC' },
      });

      return {
        articles,
        author,
        total: articles.length,
      };
    } catch (error) {
      console.error('Error fetching articles by author:', error);
      throw error;
    }
  }

  async getFeaturedArticles(): Promise<Article[]> {
    try {
      const articles = await this.articleRepository.find({
        relations: ['author'],
        order: { published_at: 'DESC' },
        take: 5,
      });

      return articles;
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      throw error;
    }
  }

  async getArticleById(articleId: number): Promise<Article | null> {
    try {
      const article = await this.articleRepository.findOne({
        where: { id: articleId },
        relations: ['author'],
      });

      return article;
    } catch (error) {
      console.error('Error fetching article by ID:', error);
      throw error;
    }
  }

  async getAllArticles(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    articles: Article[];
    total: number;
    totalPages: number;
  }> {
    try {
      const [articles, total] = await this.articleRepository.findAndCount({
        relations: ['author'],
        order: { published_at: 'DESC' },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        articles,
        total,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error('Error fetching all articles:', error);
      throw error;
    }
  }
}
