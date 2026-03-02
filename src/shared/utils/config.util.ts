/**
 * Safely parses a port number from a string, with explicit validation.
 * Throws a clear error if the port is invalid, ensuring better diagnostics.
 */
export function validatePort(
  val: string | undefined,
  defaultValue: number,
): number {
  if (!val) return defaultValue;

  const port = parseInt(val, 10);

  if (isNaN(port)) {
    throw new Error(`Invalid DB_PORT: "${val}". Port must be a valid number.`);
  }

  if (port < 0 || port > 65535) {
    throw new Error(
      `Invalid DB_PORT: "${val}". Port must be between 0 and 65535.`,
    );
  }

  return port;
}
