import { AppDataSource, initDataSource } from '../data-source';

export const revertLastMigration = async () => {
  try {
    await initDataSource();

    await AppDataSource.undoLastMigration({
      transaction: 'all',
    });

    await AppDataSource.destroy();
    return 'Db migration was reverted';
  } catch (e) {
    console.error(e);
    return 'Error occured during running migrations';
  }
};

revertLastMigration();
