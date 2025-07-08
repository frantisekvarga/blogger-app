import { runSeeder } from 'typeorm-extension';
import { AppDataSource, initDataSource } from '../data-source';
import { SeedUsers1717152713442 } from '../seeds/1717152713442-SeedUsers';
import { SeedArticles1751970889194 } from '../seeds/1751970889194-SeedArticles';

export const runSeeds = async () => {
  try {
    await initDataSource();

    await runSeeder(AppDataSource, SeedUsers1717152713442);
    await runSeeder(AppDataSource, SeedArticles1751970889194);

    await AppDataSource.destroy();
    return 'Database seeds ran successfully';
  } catch (e) {
    console.error(e);
    return 'Error occurred during running seeds';
  }
};

runSeeds();
