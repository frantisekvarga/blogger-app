import { Router } from 'express';

import { ArticleController } from '../controllers/ArticleController';
import { ImageController } from '../controllers/ImageController';
import { articleOwnerOrAdminMiddleware } from '../middleware/articleOwnerOrAdmin';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const articleController = new ArticleController();
const imageController = new ImageController();

router.get(
  '/articles/public/users/:userId/articles/:articleId',
  articleController.getArticleDetailById
);

router.post(
  '/articles/users/:userId/articles',
  articleController.createArticle
);

router.post('/articles/upload-image', imageController.uploadImage);

router.get(
  '/articles/users/:userId/articles',
  articleController.getArticlesByAuthor
);

router.get('/articles/featured', articleController.getFeaturedArticles);

router.get('/articles/get-all', articleController.getAllArticles);

router.get('/articles/drafts', authMiddleware, articleController.getDrafts);

router.get('/articles/:articleId', articleController.getArticleById);

router.patch(
  '/articles/:articleId',
  authMiddleware,
  articleOwnerOrAdminMiddleware,
  articleController.updateArticle
);

router.delete(
  '/articles/:articleId',
  authMiddleware,
  articleOwnerOrAdminMiddleware,
  articleController.deleteArticle
);

router.patch(
  '/articles/:articleId/publish',
  authMiddleware,
  articleOwnerOrAdminMiddleware,
  articleController.publishArticle
);

export default router;
