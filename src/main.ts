import { bootstrap } from './bootstrap';

bootstrap().catch((error) => {
  console.error('Error bootstrapping the application', error);
  process.exit(1);
});
