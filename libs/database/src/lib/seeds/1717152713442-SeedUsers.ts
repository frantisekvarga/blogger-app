import * as bcrypt from 'bcryptjs';
import { User } from 'database';
import type { DataSource } from 'typeorm';
import type { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class SeedUsers1717152713442 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    // Vytvor testovacieho používateľa
    const testUser = new User();
    testUser.name = 'Test User';
    testUser.email = 'test@example.com';
    testUser.password = await bcrypt.hash('password123', 10);
    testUser.role = 'user';

    await userRepository.save(testUser);

    // Vytvor admin používateľa
    const adminUser = new User();
    adminUser.name = 'Admin User';
    adminUser.email = 'admin@example.com';
    adminUser.password = await bcrypt.hash('admin123', 10);
    adminUser.role = 'admin';

    await userRepository.save(adminUser);

    // Vytvor ďalších používateľov pomocou factory
    const userFactory = await factoryManager.get(User);
    await userFactory.saveMany(3);
  }
}
