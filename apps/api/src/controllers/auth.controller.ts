import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import {
  MissingFieldsException,
  PasswordMismatchException,
} from '../types/exceptions';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // POST /api/auth/register
  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, name, password, confirmPassword } = req.body;

      if (!email || !name || !password || !confirmPassword) {
        const missingFields = [];
        if (!email) missingFields.push('email');
        if (!name) missingFields.push('name');
        if (!password) missingFields.push('password');
        if (!confirmPassword) missingFields.push('confirmPassword');

        throw new MissingFieldsException(missingFields);
      }

      if (password !== confirmPassword) {
        throw new PasswordMismatchException();
      }

      const result = await this.authService.register({ email, name, password });

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
            role: result.user.role,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        const missingFields = [];
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');

        throw new MissingFieldsException(missingFields);
      }

      const result = await this.authService.login({ email, password });

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
            role: result.user.role,
          },
          token: result.token,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  
  getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // @ts-ignore - user
      const user = req.user;

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
