import express from 'express';
import { AppDataSource } from 'libs/database/src/lib/data-source';
import { DatabaseException } from '../types/exceptions';

export class ServerController {
  app = express();

  startServer = async (): Promise<void> => {
    try {
      await AppDataSource.initialize();
      console.log('DataSource initialized');
      const port = process.env.PORT || 3333;
      const server = this.app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}/api`);
      });

      server.on('error', console.error);
    } catch (error) {
      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
      }
      console.error('Error during Data Source initialization:', error);
      throw new DatabaseException();
    }
  };
}
