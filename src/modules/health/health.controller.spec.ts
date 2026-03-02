/**
 * Health Controller Unit Tests
 *
 * Verifies that the HealthController correctly interacts with Terminus
 * services to return health status.
 */
import {
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from '@modules/health/health.controller';

const mockHealthCheckService = {
  check: jest.fn().mockResolvedValue({ status: 'ok' }),
};

const mockMemoryHealthIndicator = {
  checkHeap: jest.fn(),
};

const mockTypeOrmHealthIndicator = {
  pingCheck: jest.fn(),
};

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: HealthCheckService, useValue: mockHealthCheckService },
        { provide: MemoryHealthIndicator, useValue: mockMemoryHealthIndicator },
        {
          provide: TypeOrmHealthIndicator,
          useValue: mockTypeOrmHealthIndicator,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  /**
   * Basic instantiation test.
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * Verifies that the health check returns expected status objects.
   */
  it('should return health status', async () => {
    expect(await controller.checkHealth()).toEqual({ status: 'ok' });
  });

  /**
   * Verifies that the root health check (hidden from swagger) returns expected status objects.
   */
  it('should return root health status', async () => {
    expect(await controller.checkRoot()).toEqual({ status: 'ok' });
  });
});
