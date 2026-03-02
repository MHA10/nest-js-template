/**
 * TypeORM Data Source Configuration
 *
 * This file defines the TypeORM Data Source used for CLI-based migrations.
 * It manually loads environment variables via dotenv to ensure the CLI
 * can connect to the database independently of the NestJS application context.
 */
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from 'dotenv';
import { join } from 'path';

import { validatePort } from '../shared/utils/config.util';

// Load environment variables from .env
config();

/**
 * TypeORM connection options used by both the application and the CLI.
 */
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: validatePort(process.env.DB_PORT, 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'nest_db',
  entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

/**
 * The default export is the initialized DataSource instance for TypeORM CLI.
 */
const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
