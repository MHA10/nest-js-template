/**
 * Environment Constants
 *
 * Defines the standard expected values for the NODE_ENV environment variable,
 * allowing type-safe comparison.
 */

/**
 * Standard Node.js execution environments.
 */
export enum Environment {
  /** Local development environment, typically running with hot-reload */
  DEVELOPMENT = 'development',
  /** Live production environment serving real traffic */
  PRODUCTION = 'production',
  /** Automated testing environment */
  TEST = 'test',
  /** Pre-production environment for integration testing and QA */
  STAGING = 'staging',
}
