import express from 'express';
import { AppDataSource } from 'libs/database/src/lib/data-source';

export class ServerController {
  app = express();

  startServer = async (): Promise<void> => {
    try {
      await AppDataSource.initialize();
      console.log('DataSource initialized');
      const port = process.env.PORT || 3333;
      const server = this.app.listen(port, () => {
        console.log(
          `Listening at http://localhost:${port}/api/public/users/3/articles/16`
        );
      });

      server.on('Error', console.error);
    } catch (error) {
      await AppDataSource.destroy();
      console.error('Error during Data Source initialization:', error);
    }
  };
}
