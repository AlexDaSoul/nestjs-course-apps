import { Module } from '@nestjs/common';
import { PemCertService } from './services/pem-cert.service';
import { JwtService } from './services/jwt.service';

@Module({
  providers: [PemCertService, JwtService],
  exports: [PemCertService, JwtService],
})
export class JwtModule {}
