/**
 * Globals Setup
 *
 * Configures the NestJS application with global settings:
 * - ValidationPipe for DTO validation and transformation.
 * - HttpExceptionFilter for standardizing error responses.
 * - TransformInterceptor for standardizing success responses.
 */
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';

/**
 * Applies global pipes, filters, and interceptors to the application.
 *
 * @param app The NestJS application instance
 */
export function setupGlobals(app: INestApplication): void {
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptor
  app.useGlobalInterceptors(new TransformInterceptor());
}
