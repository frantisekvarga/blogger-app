import { NextFunction, Request, Response } from 'express';
import { ArticleService } from '../services/article.service';
import {
  ArticleNotFoundException,
  AuthorNotFoundException,
  InvalidIdException,
} from '../types/exceptions';

export class ArticleController {
  private articleService: ArticleService;

  constructor() {
    this.articleService = new ArticleService();
  }

  getArticlesByAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const authorId = parseInt(userId, 10);

      if (isNaN(authorId)) {
        throw new InvalidIdException('user', userId);
      }

      const result = await this.articleService.getArticlesByAuthor(authorId);

      if (!result.author) {
        throw new AuthorNotFoundException(authorId);
      }

      res.status(200).json({
        success: true,
        data: {
          author: {
            id: result.author.id,
            name: result.author.name,
            email: result.author.email,
            role: result.author.role,
          },
          articles: result.articles.map(article => ({
            id: article.id,
            title: article.title,
            content: article.content,
            image_url: article.image_url,
            user_id: article.user_id,
            published_at: article.published_at,
            author: article.author
              ? {
                  id: article.author.id,
                  name: article.author.name,
                }
              : undefined,
          })),
          total: result.total,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  getFeaturedArticles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const articles = await this.articleService.getFeaturedArticles();

      res.status(200).json(
        articles.map(article => ({
          id: article.id,
          title: article.title,
          content: article.content,
          image_url: article.image_url,
          user_id: article.user_id,
          published_at: article.published_at,
          author: article.author
            ? {
                id: article.author.id,
                name: article.author.name,
              }
            : undefined,
        }))
      );
    } catch (error) {
      next(error);
    }
  };

  getAllArticles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.articleService.getAllArticles(page, limit);

      res.status(200).json({
        articles: result.articles.map(article => ({
          id: article.id,
          title: article.title,
          content: article.content,
          image_url: article.image_url,
          user_id: article.user_id,
          published_at: article.published_at,
          author: article.author
            ? {
                id: article.author.id,
                name: article.author.name,
              }
            : undefined,
        })),
        total: result.total,
        totalPages: result.totalPages,
      });
    } catch (error) {
      next(error);
    }
  };

  getArticleById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { articleId } = req.params;
      const id = parseInt(articleId, 10);

      if (isNaN(id)) {
        throw new InvalidIdException('article', articleId);
      }

      const article = await this.articleService.getArticleById(id);

      if (!article) {
        throw new ArticleNotFoundException(id);
      }

      res.status(200).json({
        id: article.id,
        title: article.title,
        content: article.content,
        image_url: article.image_url,
        user_id: article.user_id,
        published_at: article.published_at,
        author: article.author
          ? {
              id: article.author.id,
              name: article.author.name,
            }
          : undefined,
      });
    } catch (error) {
      next(error);
    }
  };

  updateArticle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { articleId } = req.params;
      const id = parseInt(articleId, 10);
      if (isNaN(id)) {
        throw new InvalidIdException('article', articleId);
      }
      const updates = req.body;
      const updated = await this.articleService.updateArticle(id, updates);
      if (!updated) {
        throw new ArticleNotFoundException(id);
      }
      res.status(200).json({
        id: updated.id,
        title: updated.title,
        content: updated.content,
        image_url: updated.image_url,
        user_id: updated.user_id,
        published_at: updated.published_at,
        author: updated.author
          ? {
              id: updated.author.id,
              name: updated.author.name,
            }
          : undefined,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteArticle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { articleId } = req.params;
      const id = parseInt(articleId, 10);
      if (isNaN(id)) {
        throw new InvalidIdException('article', articleId);
      }
      const deleted = await this.articleService.deleteArticle(id);
      if (!deleted) {
        throw new ArticleNotFoundException(id);
      }
      res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
