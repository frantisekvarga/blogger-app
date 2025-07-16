import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
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

  resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { currentPassword, newPassword } = req.body;
      // @ts-ignore - user
      const user = req.user;

      if (!currentPassword || !newPassword) {
        const missingFields = [];
        if (!currentPassword) missingFields.push('currentPassword');
        if (!newPassword) missingFields.push('newPassword');

        throw new MissingFieldsException(missingFields);
      }

      await this.authService.resetPassword(
        user.id,
        currentPassword,
        newPassword
      );

      res.status(200).json({
        success: true,
        data: {
          message: 'Password reset successfully',
        },
      });
    } catch (error) {
      next(error);
    }
  };

  deleteAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { currentPassword } = req.body;
      // @ts-ignore - user
      const user = req.user;

      if (!currentPassword) {
        throw new MissingFieldsException(['currentPassword']);
      }

      await this.authService.deleteAccount(user.id, currentPassword);

      res.status(200).json({
        success: true,
        data: {
          message: 'Account deleted successfully',
        },
      });
    } catch (error) {
      next(error);
    }
  };

  getUserStats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // @ts-ignore - user
      const user = req.user;

      const stats = await this.authService.getUserStats(user.id);

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.body;

      if (!email) {
        throw new MissingFieldsException(['email']);
      }

      await this.authService.forgotPassword(email);

      res.status(200).json({
        success: true,
        data: {
          message: 'Password reset email sent successfully',
        },
      });
    } catch (error) {
      next(error);
    }
  };

  resetPasswordWithToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        const missingFields = [];
        if (!token) missingFields.push('token');
        if (!newPassword) missingFields.push('newPassword');

        throw new MissingFieldsException(missingFields);
      }

      await this.authService.resetPasswordWithToken(token, newPassword);

      res.status(200).json({
        success: true,
        data: {
          message: 'Password reset successfully',
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
