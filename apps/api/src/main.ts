import express from 'express';
import * as path from 'path';

import { ServerController } from './controllers/ServerController';
import articleRouter from './routes/ArticleRouters';

const server = new ServerController();

server.app.use(express.json());
server.app.use('/assets', express.static(path.join(__dirname, 'assets')));
server.app.use('/api', articleRouter);

server.startServer();
