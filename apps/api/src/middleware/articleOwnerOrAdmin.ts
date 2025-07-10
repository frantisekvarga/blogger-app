import { NextFunction, Request, Response } from 'express';
import { ArticleService } from '../services/article.service';
import {
  ArticleNotFoundException,
  InvalidIdException,
  MissingTokenException,
  UnauthorizedException,
} from '../types/exceptions';

const articleService = new ArticleService();

export async function articleOwnerOrAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // @ts-ignore
    const user = req.user;
    const articleId = parseInt(req.params.articleId, 10);

    if (!user) {
      throw new MissingTokenException();
    }

    if (isNaN(articleId)) {
      throw new InvalidIdException('article', req.params.articleId);
    }

    const article = await articleService.getArticleById(articleId);
    if (!article) {
      throw new ArticleNotFoundException(articleId);
    }

    if (article.user_id === user.id || user.role === 'admin') {
      next();
    } else {
      throw new UnauthorizedException('modify');
    }
  } catch (error) {
    next(error);
  }
}
