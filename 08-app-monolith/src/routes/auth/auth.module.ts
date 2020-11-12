import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { PemCertService } from '@jws/services/pem-cert.service';
import { JwsModule } from '@jws/jws.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [JwsModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements OnApplicationBootstrap {
  constructor(private readonly pemService: PemCertService) {}

  async onApplicationBootstrap() {
    try {
      const keys = await this.pemService.createCertificate();

      process.env.JWT_PUB = keys.JWT_PUB;
      process.env.JWT_PRIV = keys.JWT_PRIV;
    } catch (error) {
      throw error;
    }
  }
}
