/**
 * Core Response Interface
 *
 * Defines the standard shape of successful API responses.
 * (Note: NestJS interceptors typically wrap data with 'data' and 'timestamp',
 *  this type can be used when manually constructing complex responses).
 */
export interface ICoreResponse<T = any> {
  /** Indicates if the operation was successful always true for 2xx responses */
  success: boolean;
  /** Optional human-readable message describing the outcome */
  message?: string;
  /** The generic payload */
  data?: T;
  /** ISO string representation of when the response was generated */
  timestamp: string;
}
