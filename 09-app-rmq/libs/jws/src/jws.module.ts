import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PemCertService } from './services/pem-cert.service';
import { JwsService } from './services/jws.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.NATS_AUTH_SERVICE,
        transport: Transport.NATS,
        options: {
          url: `${process.env.NATS_HOST}:${process.env.NATS_PORT}`,
          queue: process.env.NATS_AUTH_QUEUE,
        },
      },
    ]),
  ],
  providers: [PemCertService, JwsService],
  exports: [PemCertService, JwsService],
})
export class JwsModule {}
