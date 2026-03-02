/**
 * Health Module
 *
 * Provides diagnostic and health check capabilities for the application.
 * Integrates with @nestjs/terminus for system monitoring.
 */
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from '@modules/health/health.controller';

/**
 * Encapsulates health monitoring logic and exposes related REST endpoints.
 */
@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
