/**
 * Application Entry Point
 *
 * This file is the primary entry point for the Node process.
 * It imports and executes the application bootstrap logic.
 */
import { bootstrap } from '@/bootstrap';

bootstrap().catch((error) => {
  console.error('Error bootstrapping the application', error);
  process.exit(1);
});
