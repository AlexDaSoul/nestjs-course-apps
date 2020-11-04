import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [UserModule, RegistrationModule],
})
export class AppModule {}
