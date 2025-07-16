import { NextFunction, Request, Response } from 'express';
import { ArticleService } from '../services/ArticleServices';
import {
  ArticleNotFoundException,
  ArticleUnauthorizedException,
  InvalidIdException,
  MissingTokenException,
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

    const article = await articleService.getArticleByIdSimple(articleId);
    if (!article) {
      throw new ArticleNotFoundException(articleId);
    }

    if (article.user_id === user.id || user.role === 'admin') {
      next();
    } else {
      throw new ArticleUnauthorizedException('modify');
    }
  } catch (error) {
    next(error);
  }
}
