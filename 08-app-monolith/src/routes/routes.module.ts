import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TicketsModule, UserModule, AuthModule],
})
export class RoutesModule {}
