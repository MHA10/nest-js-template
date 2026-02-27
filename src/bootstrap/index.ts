import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from '@/app.module';
import { setupGlobals } from '@config/globals.setup';
import { setupSwagger } from '@config/swagger.setup';
import { DataSource } from 'typeorm';

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
  if (dataSource.isInitialized) {
    logger.log('Database connection established successfully');
  } else {
    logger.error('Database connection failed');
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(
    `Swagger documentation is available at: http://localhost:${port}/api/docs`,
  );
  logger.log(`Health check is available at: http://localhost:${port}/health`);
}
