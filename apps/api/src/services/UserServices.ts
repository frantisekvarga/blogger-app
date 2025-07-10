import { AppDataSource } from 'libs/database/src/lib/data-source';
import { User } from 'libs/database/src/lib/entities/user.entity';

export class UserService {
  async getUserById(userId: number): Promise<User | null> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      return await userRepository.findOneBy({ id: userId });
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}
