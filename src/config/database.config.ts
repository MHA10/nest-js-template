import { registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { validatePort, TypeOrmLogger } from '@shared/utils';

export const databaseConfig = registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: validatePort(process.env.DB_PORT, 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'nest_db',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  logger: process.env.DB_LOGGING === 'true' ? new TypeOrmLogger() : undefined,
  migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  namingStrategy: new SnakeNamingStrategy(),
}));
