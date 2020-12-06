import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PkiResponse } from './jws.interfaces';
import { PemCertService } from './services/pem-cert.service';

@Controller('pem')
export class PemController {
  constructor(
    private pemCertService: PemCertService,
  ) {}

  @MessagePattern('setPemPublicKey')
  public setPemPublicKey(@Payload() data: PkiResponse): void {
    console.log('setPemPublicKey', data);
  }
}
