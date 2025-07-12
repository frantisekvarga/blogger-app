import { Router } from 'express';

import { ArticleController } from '../controllers/ArticleController';
import { ImageController } from '../controllers/ImageController';

const router = Router();
const articleController = new ArticleController();
const imageController = new ImageController(); 

router.get(
  '/public/users/:userId/articles/:articleId',
  articleController.getArticleDetailById
);
router.post('/users/:userId/articles', articleController.createArticle);

router.post( '/upload-image',imageController.uploadImage);

export default router;
