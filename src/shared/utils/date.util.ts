/**
 * Date Utilities
 *
 * Provides common helper functions for formatting and validating dates.
 */

/**
 * Formats a Date object into a standard ISO 8601 string representation.
 *
 * @param date The JavaScript Date object to format.
 * @returns An ISO string (e.g., '2023-01-01T00:00:00.000Z').
 */
export const formatDate = (date: Date): string => {
  return date.toISOString();
};
