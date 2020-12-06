import { Module } from '@nestjs/common';
import { PemCertService } from './services/pem-cert.service';
import { JwsService } from './services/jws.service';

@Module({
  providers: [PemCertService, JwsService],
  exports: [PemCertService, JwsService],
})
export class JwsModule {}
