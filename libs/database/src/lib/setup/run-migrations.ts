import { AppDataSource, initDataSource } from '../data-source';

export const runMigrations = async () => {
  try {
    await initDataSource();

    const migrations = await AppDataSource.runMigrations({
      transaction: 'all',
    });

    await AppDataSource.destroy();
    return `Db migrations[${migrations.length}] ran succesfully`;
  } catch (e) {
    console.error(e);
    return 'Error occured during running migrations';
  }
};

runMigrations();
