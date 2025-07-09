import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as entities from './entities';

import { allSeeds } from './seeds';
import { allFactories } from './factories';


const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: Object.values(entities),
  migrations: [__dirname + '/migrations/*.ts'],
  seeds: allSeeds,
  seedTracking: false,
  factories: allFactories,
};

export const AppDataSource = new DataSource(options);

export const initDataSource = async () => {
  try {
    if (!AppDataSource.isInitialized) return AppDataSource.initialize();
  } catch (error) {
    console.error('Error during initializing data source', error);
  }
};
