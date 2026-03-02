/**
 * Global Transform Interceptor
 *
 * Wraps success responses in a structured payload format, including
 * the requested data and the server timestamp.
 */
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

/**
 * Standardized response format envelope.
 */
export interface Response<T> {
  data: T;
  timestamp: string;
}

/**
 * Interceptor mapping handler responses into the `Response<T>` format.
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  /**
   * Intercepts the request execution flow to wrap the JSON outcome.
   *
   * @param _context The execution context (unused here).
   * @param next The call handler for the request.
   * @returns An observable emitting the formatted response.
   */
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: unknown) => ({
        data: data as T,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
