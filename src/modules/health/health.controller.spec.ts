import { HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from '@modules/health/health.controller';

const mockHealthCheckService = {
  check: jest.fn().mockResolvedValue({ status: 'ok' }),
};

const mockMemoryHealthIndicator = {
  checkHeap: jest.fn(),
};

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: HealthCheckService, useValue: mockHealthCheckService },
        { provide: MemoryHealthIndicator, useValue: mockMemoryHealthIndicator },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health status', async () => {
    expect(await controller.check()).toEqual({ status: 'ok' });
  });
});
