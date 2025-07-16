import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { MissingTokenException } from '../types/exceptions';

const authService = new AuthService();

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log('authMiddleware - URL:', req.url);
    console.log('authMiddleware - headers:', req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('authMiddleware - Missing or invalid auth header');
      throw new MissingTokenException();
    }

    const token = authHeader.split(' ')[1];
    console.log('authMiddleware - Token:', token.substring(0, 20) + '...');

    const user = await authService.getCurrentUser(token);
    console.log(
      'authMiddleware - User found:',
      user ? { id: user.id, email: user.email } : null
    );
    console.log('authMiddleware - user.id:', user?.id);
    console.log('authMiddleware - typeof user.id:', typeof user?.id);

    if (!user || !user.id) {
      console.log('authMiddleware - User or user.id is falsy');
      throw new Error('Invalid user data');
    }

    // @ts-ignore
    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (error) {
    console.log('authMiddleware - Error:', error);
    next(error);
  }
}
