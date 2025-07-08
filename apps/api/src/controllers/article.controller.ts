import { Request, Response } from 'express';
import { ArticleService } from '../services/article.service';

export class ArticleController {
  private articleService: ArticleService;

  constructor() {
    this.articleService = new ArticleService();
  }

  // GET /api/public/users/:userId/articles
  getArticlesByAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const authorId = parseInt(userId, 10);

      if (isNaN(authorId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const result = await this.articleService.getArticlesByAuthor(authorId);

      if (!result.author) {
        res.status(404).json({ error: 'Author not found' });
        return;
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
      console.error('Error in getArticlesByAuthor:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // GET /api/public/articles/featured
  getFeaturedArticles = async (req: Request, res: Response): Promise<void> => {
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
      console.error('Error in getFeaturedArticles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // GET /api/public/articles
  getAllArticles = async (req: Request, res: Response): Promise<void> => {
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
      console.error('Error in getAllArticles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // GET /api/public/articles/:articleId
  getArticleById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { articleId } = req.params;
      const id = parseInt(articleId, 10);

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid article ID' });
        return;
      }

      const article = await this.articleService.getArticleById(id);

      if (!article) {
        res.status(404).json({ error: 'Article not found' });
        return;
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
      console.error('Error in getArticleById:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
