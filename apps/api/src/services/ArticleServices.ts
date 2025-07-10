import { AppDataSource } from 'libs/database/src/lib/data-source';
import { Article } from 'libs/database/src/lib/entities/article.entity';
import { Not } from 'typeorm';

export class ArticleService {
  async getArticleById(
    userId: number,
    articleId: number
  ): Promise<Article | null> {
    try {
      const articleRepository = AppDataSource.getRepository(Article);
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
