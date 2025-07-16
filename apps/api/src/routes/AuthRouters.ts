import { Router } from 'express';
import { AuthController } from '../controllers/AurhController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const authController = new AuthController();


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.getCurrentUser);
router.post('/reset-password', authMiddleware, authController.resetPassword);
router.post('/delete-account', authMiddleware, authController.deleteAccount);
router.get('/stats', authMiddleware, authController.getUserStats);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password-with-token', authController.resetPasswordWithToken);

export { router as authRoutes };
