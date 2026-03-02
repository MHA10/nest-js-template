/**
 * Mapping Utilities
 *
 * Provides type-safe functions for recursively converting object keys
 * between camelCase and snake_case formatting. Useful when interacting
 * with external APIs or databases that use a different naming convention.
 */

/**
 * Converts a string from camelCase to snake_case.
 *
 * @param str The camelCase string to convert.
 * @returns The converted snake_case string.
 */
export const toSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter, offset) =>
    offset > 0 ? `_${letter.toLowerCase()}` : letter.toLowerCase(),
  );
};

/**
 * Converts a string from snake_case to camelCase.
 *
 * @param str The snake_case string to convert.
 * @returns The converted camelCase string.
 */
export const toCamelCase = (str: string): string => {
  return str.replace(/(_\w)/g, (match) => match[1].toUpperCase());
};

/**
 * Type-safe utility to convert string literal types to snake_case.
 */
export type SnakeCase<S extends string> =
  InternalSnakeCase<S> extends `_${infer T}` ? T : InternalSnakeCase<S>;

type InternalSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Uppercase<T> ? (T extends Lowercase<T> ? '' : '_') : ''}${Lowercase<T>}${InternalSnakeCase<U>}`
  : S;

/**
 * Type-safe utility to convert string literal types to camelCase.
 */
export type CamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${Lowercase<T>}${Capitalize<CamelCase<U>>}`
  : Lowercase<S>;

/**
 * Recursively maps the keys of a type to snake_case.
 */
export type SnakeCaseKeys<T> = T extends (infer U)[]
  ? SnakeCaseKeys<U>[]
  : T extends Date | null | undefined
    ? T
    : T extends object
      ? { [K in keyof T as SnakeCase<K & string>]: SnakeCaseKeys<T[K]> }
      : T;

/**
 * Recursively maps the keys of a type to camelCase.
 */
export type CamelCaseKeys<T> = T extends (infer U)[]
  ? CamelCaseKeys<U>[]
  : T extends Date | null | undefined
    ? T
    : T extends object
      ? { [K in keyof T as CamelCase<K & string>]: CamelCaseKeys<T[K]> }
      : T;

/**
 * Recursively maps object keys or arrays of objects to snake_case.
 *
 * @param data The object or array to transform.
 * @returns A deeply cloned object/array with all keys mapped to snake_case.
 */
export function mapToSnakeCase<T>(data: T): SnakeCaseKeys<T> {
  if (data === null || data === undefined || typeof data !== 'object') {
    return data as unknown as SnakeCaseKeys<T>;
  }

  if (data instanceof Date) {
    return data as unknown as SnakeCaseKeys<T>;
  }

  if (Array.isArray(data)) {
    return data.map(
      (item) => mapToSnakeCase(item) as unknown,
    ) as unknown as SnakeCaseKeys<T>;
  }

  const result: Record<string, unknown> = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const snakeKey = toSnakeCase(key);
      const value = (data as Record<string, unknown>)[key];
      result[snakeKey] = mapToSnakeCase(value);
    }
  }

  return result as unknown as SnakeCaseKeys<T>;
}

/**
 * Recursively maps object keys or arrays of objects to camelCase.
 *
 * @param data The object or array to transform.
 * @returns A deeply cloned object/array with all keys mapped to camelCase.
 */
export function mapToCamelCase<T>(data: T): CamelCaseKeys<T> {
  if (data === null || data === undefined || typeof data !== 'object') {
    return data as unknown as CamelCaseKeys<T>;
  }

  if (data instanceof Date) {
    return data as unknown as CamelCaseKeys<T>;
  }

  if (Array.isArray(data)) {
    return data.map(
      (item) => mapToCamelCase(item) as unknown,
    ) as unknown as CamelCaseKeys<T>;
  }

  const result: Record<string, unknown> = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const camelKey = toCamelCase(key);
      const value = (data as Record<string, unknown>)[key];
      result[camelKey] = mapToCamelCase(value);
    }
  }

  return result as unknown as CamelCaseKeys<T>;
}
