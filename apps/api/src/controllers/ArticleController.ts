import type { Request, Response } from 'express';

import { ArticleService } from '../services/ArticleServices';
import { UserService } from '../services/UserServices';

export class ArticleController {
  private articleService: ArticleService = new ArticleService();
  private userService: UserService = new UserService();

  getArticleDetailById = async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const articleId = Number(req.params.articleId);

    if (isNaN(userId) || isNaN(articleId)) {
      res.status(400).json({ error: 'Invalid parameters' });
      return;
    }
    try {
      const article = await this.articleService.getArticleById(
        userId,
        articleId
      );
      if (!article) {
        res.status(404).json({ error: 'Request not found' });
        return;
      }

      const user = await this.userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: 'Request not found' });
        return;
      }

      const recentArticles = await this.articleService.getRecentArticlesByUser(
        userId,
        articleId
      );

      res.status(200).json({
        article,
        userName: user.name,
        recentArticles: recentArticles.map(article => ({
          id: article.id,
          title: article.title,
          perex: article.perex,
          publishedAt: article.published_at,
        })),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
}
