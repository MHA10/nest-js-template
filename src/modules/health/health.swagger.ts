/**
 * Health Swagger Documentation
 *
 * Defines reusable Swagger decorators for health check endpoints,
 * providing standardized response examples and status codes.
 */
import { StandardApiDoc } from '@common/decorators/api-response.decorator';

/**
 * Custom Swagger decorator for the health check success response.
 *
 * @returns A composite decorator with operation summary and response examples.
 */
export function ApiHealthCheckResponse() {
  return StandardApiDoc({
    summary: 'Check system health status',
    description:
      'Pings the database and checks memory heap usage to verify the application is healthy and reachable.',
    example: {
      status: 'ok',
      info: {
        database: {
          status: 'up',
        },
        memory_heap: {
          status: 'up',
        },
      },
      error: {},
      details: {
        database: {
          status: 'up',
        },
        memory_heap: {
          status: 'up',
        },
      },
    },
    errors: [500],
  });
}
