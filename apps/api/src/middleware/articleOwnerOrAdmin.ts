import { NextFunction, Request, Response } from 'express';
import { ArticleService } from '../services/article.service';

const articleService = new ArticleService();

export async function articleOwnerOrAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // @ts-ignore
  const user = req.user;
  const articleId = parseInt(req.params.articleId, 10);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (isNaN(articleId)) {
    return res.status(400).json({ error: 'Invalid article ID' });
  }
  try {
    const article = await articleService.getArticleById(articleId);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    if (article.user_id === user.id || user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ error: 'Forbidden: Not owner or admin' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
