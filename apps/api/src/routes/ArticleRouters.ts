import { Router } from 'express';
import { ArticleController } from '../controllers/ArticleController';

const router = Router();
const articleController = new ArticleController();

router.get(
  '/public/users/:userId/articles/:articleId',
  articleController.getArticleById.bind(articleController)
);

export default router;
