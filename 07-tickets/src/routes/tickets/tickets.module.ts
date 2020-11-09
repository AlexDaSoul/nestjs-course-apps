import { Module } from '@nestjs/common';
import { DalModule } from '@dal/dal.module';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { WsGatewayGateway } from './ws-gateway.gateway';

@Module({
  imports: [DalModule],
  controllers: [TicketsController],
  providers: [TicketsService, WsGatewayGateway],
})
export class TicketsModule {}
