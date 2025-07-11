import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { MissingTokenException } from '../types/exceptions';

const authService = new AuthService();

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new MissingTokenException();
    }

    const token = authHeader.split(' ')[1];
    const user = await authService.getCurrentUser(token);

    // @ts-ignore
    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (error) {
    next(error);
  }
}
