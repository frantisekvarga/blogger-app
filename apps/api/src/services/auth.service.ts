import bcrypt from 'bcryptjs';
import { AppDataSource, User } from 'database';
import jwt, { SignOptions } from 'jsonwebtoken';
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

    // Hash password
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
