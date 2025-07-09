import { Request, Response } from 'express';
import { ArticleService } from '../services/ArticleServices';

export class ArticleController {
  
  private articleService: ArticleService = new ArticleService();

  getArticleById = async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const articleId = Number(req.params.articleId);

    if (isNaN(userId) || isNaN(articleId)) {
      res.status(422).json({ error: 'Invalid parameters' });
      return;
    }
    try {
      const article = await this.articleService.getArticleById(userId, articleId);
      if (!article) {
        res.status(404).json({ error: 'Article not found' });
        return;
      }
      res.status(200).json(article);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
}
