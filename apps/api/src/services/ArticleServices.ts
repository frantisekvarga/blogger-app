import { AppDataSource } from 'libs/database/src/lib/data-source';
import { AppDataSource } from 'libs/database/src/lib/data-source';
import { Article } from 'libs/database/src/lib/entities/article.entity';
import { Not } from 'typeorm';
import { Not } from 'typeorm';

export class ArticleService {
  async getArticleById(
    userId: number,
    articleId: number
  ): Promise<Article | null> {
  async getArticleById(
    userId: number,
    articleId: number
  ): Promise<Article | null> {
    try {
      const articleRepository = AppDataSource.getRepository(Article);
      return await articleRepository.findOne({
      return await articleRepository.findOne({
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
      const articleRepository = AppDataSource.getRepository(Article);
      const articles = await articleRepository.find({
        where: {
          user_id: userId,
          id: Not(excludeArticleId),
          isPublished: true,
        },
        order: {
          published_at: 'DESC',
        },
        take: 5,
      });
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
      const articleRepository = AppDataSource.getRepository(Article);
      const newArticle = articleRepository.create({
        title: data.title,
        perex: data.perex,
        image_url: data.imageUrl,
        content: data.content,
        isPublished: data.isPublished,
        user_id: userId,
      });

      await articleRepository.save(newArticle);
      return newArticle;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  }

  async getRecentArticlesByUser(
    userId: number,
    excludeArticleId: number
  ): Promise<Article[]> {
    try {
      const articleRepository = AppDataSource.getRepository(Article);
      const articles = await articleRepository.find({
        where: {
          user_id: userId,
          id: Not(excludeArticleId),
        },
        order: {
          published_at: 'DESC',
        },
        take: 5,
      });
      return articles;
    } catch (error) {
      console.error('Error fetching recent articles:', error);
      throw error;
    }
  }
}
