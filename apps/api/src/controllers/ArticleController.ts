import type { Request, Response } from 'express';

import { ArticleService } from '../services/ArticleServices';
import { UserService } from '../services/UserServices';
import {
  ArticleException,
  ArticleNotFoundException,
  AuthException,
  AuthorNotFoundException,
  InternalServerException,
  InvalidArticleDataException,
  InvalidIdException,
  InvalidParametersException,
  RequestNotFoundException,
  UnauthorizedException,
  ValidationException,
} from '../types/exceptions';

export class ArticleController {
  private articleService: ArticleService = new ArticleService();
  private userService: UserService = new UserService();

  getArticleDetailById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      const articleId = Number(req.params.articleId);

      if (isNaN(userId) || isNaN(articleId)) {
        throw new InvalidParametersException(['userId', 'articleId']);
      }

      const article = await this.articleService.getArticleById(
        userId,
        articleId
      );
      if (!article) {
        throw new RequestNotFoundException();
      }

      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new RequestNotFoundException();
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
    } catch (error) {
      if (
        error instanceof ArticleException ||
        error instanceof ValidationException
      ) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Error in getArticleDetailById:', error);
        throw new InternalServerException();
      }
    }
  };

  createArticle = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.userId);

      if (isNaN(userId)) {
        throw new InvalidParametersException(['userId']);
      }

      const { title, perex, imageUrl, content, isPublished } = req.body;

      if (
        !title ||
        !perex ||
        !imageUrl ||
        !content ||
        typeof isPublished !== 'boolean'
      ) {
        throw new InvalidArticleDataException();
      }

      const newArticle = await this.articleService.createArticle(userId, {
        title,
        perex,
        imageUrl,
        content,
        isPublished,
      });
      res.status(200).json(newArticle);
    } catch (error) {
      if (error instanceof ValidationException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Error in createArticle:', error);
        throw new InternalServerException();
      }
    }
  };

  getArticlesByAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const authorId = parseInt(userId, 10);
      const search = req.query.search as string;

      if (isNaN(authorId)) {
        throw new InvalidIdException('user', userId);
      }

      const result = await this.articleService.getArticlesByAuthor(
        authorId,
        search
      );

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
            perex: article.perex,
            image_url: article.image_url,
            user_id: article.user_id,
            published_at: article.published_at,
            created_at: article.createdAt,
            updated_at: article.updatedAt,
            is_published: article.isPublished,
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
      if (error instanceof AuthorNotFoundException) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof InvalidIdException) {
        res.status(400).json({ error: error.message });
      } else {
        console.error('Error in getArticlesByAuthor:', error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  };

  getFeaturedArticles = async (req: Request, res: Response): Promise<void> => {
    try {
      const articles = await this.articleService.getFeaturedArticles();

      res.status(200).json(
        articles.map(article => ({
          id: article.id,
          title: article.title,
          content: article.content,
          perex: article.perex,
          image_url: article.image_url,
          user_id: article.user_id,
          published_at: article.published_at,
          created_at: article.createdAt,
          updated_at: article.updatedAt,
          is_published: article.isPublished,
          author: article.author
            ? {
                id: article.author.id,
                name: article.author.name,
              }
            : undefined,
        }))
      );
    } catch (error) {
      if (error instanceof ArticleException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Error in getFeaturedArticles:', error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  };

  getAllArticles = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const result = await this.articleService.getAllArticles(
        page,
        limit,
        search
      );

      res.status(200).json({
        articles: result.articles.map(article => ({
          id: article.id,
          title: article.title,
          content: article.content,
          perex: article.perex,
          image_url: article.image_url,
          user_id: article.user_id,
          published_at: article.published_at,
          created_at: article.createdAt,
          updated_at: article.updatedAt,
          is_published: article.isPublished,
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
      if (error instanceof ArticleException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Error in getAllArticles:', error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  };

  getArticleById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { articleId } = req.params;
      const id = parseInt(articleId, 10);

      if (isNaN(id)) {
        throw new InvalidIdException('article', articleId);
      }

      const article = await this.articleService.getArticleByIdSimple(id);

      if (!article) {
        throw new ArticleNotFoundException(id);
      }

      res.status(200).json({
        id: article.id,
        title: article.title,
        content: article.content,
        perex: article.perex,
        image_url: article.image_url,
        user_id: article.user_id,
        published_at: article.published_at,
        created_at: article.createdAt,
        updated_at: article.updatedAt,
        is_published: article.isPublished,
        author: article.author
          ? {
              id: article.author.id,
              name: article.author.name,
            }
          : undefined,
      });
    } catch (error) {
      if (error instanceof ArticleException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Error in getArticleById:', error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  };

  updateArticle = async (req: Request, res: Response): Promise<void> => {
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
        perex: updated.perex,
        image_url: updated.image_url,
        user_id: updated.user_id,
        published_at: updated.published_at,
        created_at: updated.createdAt,
        updated_at: updated.updatedAt,
        is_published: updated.isPublished,
        author: updated.author
          ? {
              id: updated.author.id,
              name: updated.author.name,
            }
          : undefined,
      });
    } catch (error) {
      if (error instanceof ArticleException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Error in updateArticle:', error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  };

  deleteArticle = async (req: Request, res: Response): Promise<void> => {
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
      if (error instanceof ArticleException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Error in deleteArticle:', error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  };

  getDrafts = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      // @ts-ignore
      const user = req.user;

      if (!user) {
        throw new UnauthorizedException();
      }

      if (!user.id) {
        throw new InvalidParametersException(['user.id']);
      }

      const result = await this.articleService.getDrafts(user.id, page, limit);

      res.status(200).json({
        articles: result.articles.map(article => ({
          id: article.id,
          title: article.title,
          content: article.content,
          perex: article.perex,
          image_url: article.image_url,
          user_id: article.user_id,
          published_at: article.published_at,
          created_at: article.createdAt,
          updated_at: article.updatedAt,
          is_published: article.isPublished,
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
      if (
        error instanceof AuthException ||
        error instanceof ValidationException
      ) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Error in getDrafts:', error);
        throw new InternalServerException();
      }
    }
  };

  publishArticle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { articleId } = req.params;
      const id = parseInt(articleId, 10);
      if (isNaN(id)) {
        throw new InvalidIdException('article', articleId);
      }

      const published = await this.articleService.publishArticle(id);
      if (!published) {
        throw new ArticleNotFoundException(id);
      }

      res.status(200).json({
        success: true,
        message: 'Article published successfully',
      });
    } catch (error) {
      if (error instanceof ArticleException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Error in publishArticle:', error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  };
}
