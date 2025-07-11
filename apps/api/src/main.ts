/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { AppDataSource } from 'database';
import express from 'express';
import * as path from 'path';
import { errorHandler } from './middleware/errorHandler';
import { articleRoutes } from './routes/article.routes';
import { authRoutes } from './routes/auth.routes';

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error: Error) => {
    console.error('Database connection failed:', error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
