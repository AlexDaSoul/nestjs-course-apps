import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PemCertService } from '../jws/services/pem-cert.service';
import { JwtModule } from '../jws/jwt.module';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
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
