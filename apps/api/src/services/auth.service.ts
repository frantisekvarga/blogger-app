import bcrypt from 'bcryptjs';
import { AppDataSource, User } from 'database';
import jwt from 'jsonwebtoken';

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

  async register(data: RegisterData): Promise<AuthResult> {
    const { email, name, password } = data;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
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

    const token = this.generateToken(savedUser);

    return {
      user: savedUser,
      token,
    };
  }

  async login(data: LoginData): Promise<AuthResult> {
    const { email, password } = data;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
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
        throw new Error('Invalid token');
      }

      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  private generateToken(user: User): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, this.jwtSecret, { expiresIn: '24h' });
  }
}
