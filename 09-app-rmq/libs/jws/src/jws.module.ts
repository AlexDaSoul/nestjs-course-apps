import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PemCertService } from './services/pem-cert.service';
import { JwsService } from './services/jws.service';
import { PemController } from './pem.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.RMQ_AUTH_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [`${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
          queue: process.env.RMQ_AUTH_QUEUE,
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [PemController],
  providers: [PemCertService, JwsService],
  exports: [PemCertService, JwsService],
})
export class JwsModule {}
