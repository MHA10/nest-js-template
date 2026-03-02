/**
 * Is Public Decorator
 *
 * Marks an endpoint as public, bypassing authentication guards.
 * Use this decorator on endpoints that should be accessible without a bearer token.
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator to flag a route as publicly accessible.
 * Read by authentication guards using the Reflector.
 */
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
