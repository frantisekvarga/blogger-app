import { Article } from 'libs/database/src/lib/entities/article.entity';
import { AppDataSource } from 'libs/database/src/lib/data-source';

export class ArticleService {
  async getArticleById(userId: number, articleId: number): Promise<Article | null> {
    
    try {
      const articleRepository = AppDataSource.getRepository(Article);
      const article = await articleRepository.findOne({
        where: {
          id: articleId,
          user_id: userId,
        },
      });
      return article || null;
    } catch (error) {
      console.error('Error fetching article by ID:', error);
      throw error;
    }
  }
}
