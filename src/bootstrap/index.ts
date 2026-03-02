import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

import { AppModule } from '@/app.module';
import { setupGlobals } from '@config/globals.setup';
import { setupSwagger } from '@config/swagger.setup';

export async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // Setup global pipes, filters, interceptors
  setupGlobals(app);

  // Setup Swagger API documentation
  setupSwagger(app);

  // Verify database connection
  const dataSource = app.get(DataSource);
  if (!dataSource.isInitialized) {
    logger.error('Database connection failed');
    await app.close();
    throw new Error('Database connection failed');
  }

  logger.log('Database connection established successfully');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(
    `Swagger documentation is available at: http://localhost:${port}/api/docs`,
  );
  logger.log(`Health check is available at: http://localhost:${port}/health`);
}
