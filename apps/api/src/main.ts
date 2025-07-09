
import express from 'express';
import * as path from 'path';
import 'dotenv/config';
import articleRouter from './routes/ArticleRouters';
import { ServerController } from './controllers/ServerController';

const server = new ServerController();

server.app.use('/assets', express.static(path.join(__dirname, 'assets')));
server.app.use('/api', articleRouter);

server.startServer();