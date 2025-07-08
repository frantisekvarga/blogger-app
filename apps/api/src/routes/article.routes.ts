import { Router } from 'express'
import { ArticleController } from '../controllers/article.controller'

const router = Router();
const articleController = new ArticleController();

// Public routes
router.get(
  '/public/users/:userId/articles',
  articleController.getArticlesByAuthor
);
router.get('/public/articles/featured', articleController.getFeaturedArticles);
router.get('/public/articles', articleController.getAllArticles);
router.get('/public/articles/:articleId', articleController.getArticleById);

export { router as articleRoutes }

