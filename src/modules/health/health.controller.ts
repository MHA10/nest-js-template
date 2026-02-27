import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { IsPublic } from '@common/decorators/is-public.decorator';
import { SwaggerTag } from '@shared/constants/swagger.constant';

@ApiTags(SwaggerTag.SYSTEM)
@Controller()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get(['', 'health'])
  @IsPublic()
  @HealthCheck()
  @ApiOperation({ summary: 'Check system health status' })
  check() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.db.pingCheck('database'),
    ]);
  }
}
