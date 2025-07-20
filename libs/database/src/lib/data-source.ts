import 'reflect-metadata';

import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';

import * as entities from './entities';

// Support both individual DB env vars and DATABASE_URL (for Render)
const getDatabaseConfig = () => {
  if (process.env.DATABASE_URL) {
    return {
      url: process.env.DATABASE_URL,
    };
  }
  
  return {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
};

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  ...getDatabaseConfig(),
  synchronize: false,
  logging: true,
  entities: Object.values(entities),
  migrations: [__dirname + '/migrations/*.ts'],
  seeds: [__dirname + '/seeds/*.ts'],
  seedTracking: false,
  factories: [__dirname + '/factories/*.factory.ts'],
};

export const AppDataSource = new DataSource(options);

export const initDataSource = async () => {
  try {
    if (!AppDataSource.isInitialized) return AppDataSource.initialize();
  } catch (error) {
    console.error('Error during initializing data source', error);
  }
};