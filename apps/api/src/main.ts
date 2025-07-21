/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import cors from 'cors';
import express from 'express';
import * as path from 'path';

import { ServerController } from './controllers/ServerController';
import { errorHandler } from './middleware/errorHandler';
import articleRouter from './routes/ArticleRouters';
import { authRoutes } from './routes/AuthRouters';

const server = new ServerController();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || [
    'https://blogger-app-or4.vercel.app',
    'https://blogger-app-sqeq.onrender.com',
    'http://localhost:4200', // pre lokálny vývoj
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

server.app.use(cors(corsOptions));

server.app.use(express.json());
server.app.use(express.urlencoded({ extended: true }));

// Health check endpoint
server.app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

server.app.use('/assets', express.static(path.join(__dirname, 'assets')));
server.app.use('/api', articleRouter);
server.app.use('/api/auth', authRoutes);
server.app.use(
  '/uploads',
  express.static(path.resolve('apps/api/public/uploads'))
);
server.app.use(errorHandler);

server.startServer();
