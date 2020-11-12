import { Module } from '@nestjs/common';
import { DalModule } from '@dal/dal.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DalModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
