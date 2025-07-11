import { Router } from 'express';
import { ArticleController } from '../controllers/article.controller';
import { articleOwnerOrAdminMiddleware } from '../middleware/articleOwnerOrAdmin';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const articleController = new ArticleController();

router.get('/users/:userId/articles', articleController.getArticlesByAuthor);
router.get('/featured', articleController.getFeaturedArticles);
router.get('/get-all', articleController.getAllArticles);
router.get('/:articleId', articleController.getArticleById);

router.patch(
  '/:articleId',
  authMiddleware,
  articleOwnerOrAdminMiddleware,
  articleController.updateArticle
);

router.delete(
  '/:articleId',
  authMiddleware,
  articleOwnerOrAdminMiddleware,
  articleController.deleteArticle
);

export { router as articleRoutes };
