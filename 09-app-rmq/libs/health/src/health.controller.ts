import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  DNSHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(
    private healthService: HealthCheckService,
    private healthMicroservice: MicroserviceHealthIndicator,
    private healthTypeOrm: TypeOrmHealthIndicator,
    private healthMemory: MemoryHealthIndicator,
    private healthDisk: DiskHealthIndicator,
    private dns: DNSHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  public check() {
    return this.healthService.check([
      () =>
        this.dns.pingCheck(
          'check-host',
          process.env.SERVICE_URL + '/health/check-host',
        ),
      () =>
        this.healthMicroservice.pingCheck('check-ms', {
          transport: Transport.RMQ,
          options: {
            urls: [`${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
            queue: process.env.RMQ_AUTH_QUEUE,
            queueOptions: {
              durable: false
            },
          },
        }),
      () => {
        if (process.env.CHECK_DB) {
          return this.healthTypeOrm.pingCheck('check-db');
        }
      },
      () => this.healthMemory.checkHeap('check-memory-heap', 150 * 1024 * 1024),
      () => this.healthMemory.checkRSS('check-memory-rss', 150 * 1024 * 1024),
      () =>
        this.healthDisk.checkStorage('check-disk', {
          thresholdPercent: 0.9,
          path: process.cwd(),
        }),
    ]);
  }

  @Get('check-host')
  public checkHost(): void {
    return void 0;
  }
}
