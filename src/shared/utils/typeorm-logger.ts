import { Logger as NestLogger } from '@nestjs/common';
import { Logger } from 'typeorm';

/**
 * Custom TypeORM logger that integrates with NestJS Logger and filters out noise.
 */
export class TypeOrmLogger implements Logger {
  private readonly logger = new NestLogger('TypeORM');

  logQuery(query: string, parameters?: any[]) {
    if (query === 'SELECT 1') return; // Filter out health check pings

    this.logger.debug(
      `Query: ${query}${parameters?.length ? ` -- Parameters: ${JSON.stringify(parameters)}` : ''}`,
    );
  }

  logQueryError(error: string | Error, query: string, parameters?: any[]) {
    this.logger.error(
      `Query Failed: ${query}${parameters?.length ? ` -- Parameters: ${JSON.stringify(parameters)}` : ''}`,
    );
    this.logger.error(`Error: ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.logger.warn(
      `Slow Query (${time}ms): ${query}${parameters?.length ? ` -- Parameters: ${JSON.stringify(parameters)}` : ''}`,
    );
  }

  logSchemaBuild(message: string) {
    this.logger.log(message);
  }

  logMigration(message: string) {
    this.logger.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    switch (level) {
      case 'log':
      case 'info':
        this.logger.log(message);
        break;
      case 'warn':
        this.logger.warn(message);
        break;
    }
  }
}
