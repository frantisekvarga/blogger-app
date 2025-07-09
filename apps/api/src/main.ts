
import express from 'express';
import * as path from 'path';
import 'dotenv/config';
import { ServerController } from './controllers/ServerController';

const server = new ServerController();

server.app.use('/assets', express.static(path.join(__dirname, 'assets')));

server.startServer();