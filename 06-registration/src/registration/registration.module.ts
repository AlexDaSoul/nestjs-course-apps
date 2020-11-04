import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { RegistrationController } from './registration.controller';

@Module({
  imports: [UserModule],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
