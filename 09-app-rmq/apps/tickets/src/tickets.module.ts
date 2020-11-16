import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { DalModule } from '@dal/dal.module';
import { JwsModule, PemCertService } from '@jws';
import { HealthModule } from '@health';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { WsGatewayGateway } from './ws-gateway.gateway';

@Module({
  imports: [DalModule, JwsModule, HealthModule],
  controllers: [TicketsController],
  providers: [TicketsService, WsGatewayGateway],
})
export class TicketsModule implements OnApplicationBootstrap {
  constructor(private readonly pemService: PemCertService) {}

  onApplicationBootstrap() {
    this.pemService.getKeys();
  }
}
