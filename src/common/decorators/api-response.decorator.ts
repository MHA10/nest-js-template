import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';

export function CoreApiResponse(options: ApiResponseOptions = {}) {
  return applyDecorators(
    ApiResponse({
      ...options,
      description: options.description || 'Successful response',
    }),
  );
}
