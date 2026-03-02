/**
 * Application Bootstrap
 *
 * Handles the initialization of the NestJS application, including:
 * - CORS setup
 * - Global middlewares (pipes, interceptors, filters)
 * - Swagger OpenAPI documentation
 * - Database connection verification
 * - Port binding and server startup
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

import { AppModule } from '@/app.module';
import { setupGlobals } from '@config/globals.setup';
import { setupSwagger } from '@config/swagger.setup';

/**
 * Initializes and starts the NestJS application server.
 *
 * @returns A Promise that resolves when the server has successfully started.
 */
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
