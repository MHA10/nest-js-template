/**
 * Global HTTP Exception Filter
 *
 * Catches all unhandled exceptions across the application and formats
 * them into a standardized JSON response structure.
 *
 * Also logs internal server errors for easier debugging.
 */
import { Request, Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

/**
 * Custom exception filter for standardizing API error responses.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  /**
   * Catches and transforms the exception into a standard JSON payload.
   *
   * @param exception The thrown exception object
   * @param host The execution context host
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    if (status === Number(HttpStatus.INTERNAL_SERVER_ERROR)) {
      this.logger.error(
        `HTTP Status: ${status} Error Message: ${JSON.stringify(message)}`,
        exception instanceof Error ? exception.stack : '',
      );
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
