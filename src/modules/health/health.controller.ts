/**
 * Health Controller
 *
 * Exposes health check endpoints for system monitoring.
 * Validates database connectivity and memory heap usage.
 */
import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { IsPublic } from '@common/decorators/is-public.decorator';
import { SwaggerTag } from '@shared/constants/swagger.constant';

import { ApiHealthCheckResponse } from './health.swagger';

@ApiTags(SwaggerTag.SYSTEM)
@Controller()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  /**
   * Hidden legacy root endpoint for load balancers.
   * Maps to the health check, but hidden from Swagger UI.
   */
  @Get('')
  @IsPublic()
  @HealthCheck()
  @ApiExcludeEndpoint()
  checkRoot() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.db.pingCheck('database'),
    ]);
  }

  /**
   * Diagnostic: Tests connectivity to the database and memory usage.
   * Useful to confirm the API and its dependencies are healthy.
   */
  @Get('health')
  @IsPublic()
  @HealthCheck()
  @ApiHealthCheckResponse()
  checkHealth() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.db.pingCheck('database'),
    ]);
  }
}
