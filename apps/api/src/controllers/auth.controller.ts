import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // POST /api/auth/register
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, name, password, confirmPassword } = req.body;

      if (!email || !name || !password || !confirmPassword) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }

      if (password !== confirmPassword) {
        res.status(400).json({ error: 'Passwords do not match' });
        return;
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
          token: result.token,
        },
      });
    } catch (error) {
      console.error('Error in register:', error);
      if (error instanceof Error && error.message.includes('already exists')) {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

  // POST /api/auth/login
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
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
      console.error('Error in login:', error);
      if (
        error instanceof Error &&
        error.message.includes('Invalid credentials')
      ) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

  // GET /api/auth/me
  getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return;
      }

      const user = await this.authService.getCurrentUser(token);

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
      console.error('Error in getCurrentUser:', error);
      if (error instanceof Error && error.message.includes('Invalid token')) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
}
