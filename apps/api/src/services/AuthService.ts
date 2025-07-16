import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { AppDataSource } from 'libs/database/src/lib/data-source';
import { User } from 'libs/database/src/lib/entities/user.entity';
import {
  InvalidCredentialsException,
  InvalidTokenException,
  UserAlreadyExistsException,
} from '../types/exceptions';

interface RegisterData {
  email: string;
  name: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResult {
  user: User;
  token: string;
}

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);
  private jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
  private jwtExpiresIn: string = process.env.JWT_EXPIRES_IN || '24h';

  async register(data: RegisterData): Promise<{ user: User }> {
    const { email, name, password } = data;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new UserAlreadyExistsException(email);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = this.userRepository.create({
      email,
      name,
      password: hashedPassword,
      role: 'user',
    });

    const savedUser = await this.userRepository.save(user);

    return {
      user: savedUser,
    };
  }

  async login(data: LoginData): Promise<AuthResult> {
    const { email, password } = data;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new InvalidCredentialsException();
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const token = this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async getCurrentUser(token: string): Promise<User> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { userId: number };

      const user = await this.userRepository.findOne({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new InvalidTokenException();
      }

      return user;
    } catch (error) {
      throw new InvalidTokenException();
    }
  }

  async resetPassword(
    userId: number,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedNewPassword;
    await this.userRepository.save(user);
  }

  async deleteAccount(userId: number, currentPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new InvalidCredentialsException();
    }

    await this.userRepository.remove(user);
  }

  async getUserStats(userId: number): Promise<{ publishedArticles: number; drafts: number }> {
    const articleRepository = AppDataSource.getRepository('article');
    
    const publishedArticles = await articleRepository.count({
      where: {
        user_id: userId,
        isPublished: true,
      },
    });

    const drafts = await articleRepository.count({
      where: {
        user_id: userId,
        isPublished: false,
      },
    });

    return {
      publishedArticles,
      drafts,
    };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return;
    }

    const resetToken = jwt.sign(
      { userId: user.id, type: 'password-reset' },
      this.jwtSecret,
      { expiresIn: '1h' }
    );

   
  }

  async resetPasswordWithToken(token: string, newPassword: string): Promise<void> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { userId: number; type: string };

      if (decoded.type !== 'password-reset') {
        throw new Error('Invalid token type');
      }

      const user = await this.userRepository.findOne({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      user.password = hashedNewPassword;
      await this.userRepository.save(user);
    } catch (error) {
      throw new Error('Invalid or expired reset token');
    }
  }

  private generateToken(user: User): string {
    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const options: SignOptions = { expiresIn: this.jwtExpiresIn as any };
    return jwt.sign(payload, this.jwtSecret, options);
  }
}
