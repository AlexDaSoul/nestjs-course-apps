import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { DalModule } from '@dal';
import { JwsModule, PemCertService } from '@jws';
import { HealthModule } from '@health';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DalModule, JwsModule, HealthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements OnApplicationBootstrap {
  constructor(private readonly pemService: PemCertService) {}

  onApplicationBootstrap() {
    this.pemService.getKeys();
  }
}
