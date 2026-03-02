/**
 * Swagger Documentation Decorators
 *
 * Provides a generic foundation for API documentation, encapsulating
 * common Swagger traits like summary, description, and standard responses.
 */
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiResponseOptions,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

export interface StandardApiDocOptions {
  /** Concise summary of the operation */
  summary: string;
  /** Detailed description of the operation */
  description?: string;
  /** HTTP status code for the successful response (default: 200) */
  status?: number;
  /** The type of the response payload (DTO or Entity) */
  type?: Type<any> | string | [any];
  /** A literal example of the successful response payload */
  example?: any;
  /** List of HTTP error codes to document (default: [500]) */
  errors?: number[];
}

/**
 * Global Generic Swagger Decorator
 *
 * Combines multiple Swagger decorators into a single, clean interface.
 * Similar to a 'BaseService', this provides a standard pattern for all endpoints.
 *
 * @param options Documentation parameters
 */
export function StandardApiDoc(options: StandardApiDocOptions) {
  const decorators = [
    ApiOperation({
      summary: options.summary,
      description: options.description,
    }),
    ApiResponse({
      status: options.status || 200,
      description: 'Operation successful',
      schema: options.example ? { example: options.example } : undefined,
      type: options.type,
    }),
  ];

  const errors = options.errors || [500];

  if (errors.includes(400)) {
    decorators.push(ApiBadRequestResponse({ description: 'Bad Request' }));
  }
  if (errors.includes(401)) {
    decorators.push(ApiUnauthorizedResponse({ description: 'Unauthorized' }));
  }
  if (errors.includes(403)) {
    decorators.push(ApiForbiddenResponse({ description: 'Forbidden' }));
  }
  if (errors.includes(404)) {
    decorators.push(ApiNotFoundResponse({ description: 'Resource not found' }));
  }
  if (errors.includes(500)) {
    decorators.push(
      ApiInternalServerErrorResponse({ description: 'Internal server error' }),
    );
  }

  return applyDecorators(...decorators);
}

/**
 * Custom Swagger decorator for standard successful API responses.
 *
 * @param options Additional options to pass to the underlying ApiResponse decorator.
 * @returns A composite decorator combining the default and provided options.
 */
export function CoreApiResponse(options: ApiResponseOptions = {}) {
  return applyDecorators(
    ApiResponse({
      ...options,
      description: options.description || 'Successful response',
    }),
  );
}
