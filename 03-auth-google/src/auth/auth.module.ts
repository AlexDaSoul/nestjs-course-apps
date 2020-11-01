import { Module, MiddlewareConsumer } from '@nestjs/common';
import * as expressSession from 'express-session';
import { initialize, session } from 'passport';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { GoogleStrategy } from './passport/google.strategy';
import { SessionSerializer } from './passport/session.serializer';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SessionSerializer],
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        expressSession({
          secret: 'blablabla',
          resave: false,
          saveUninitialized: true,
        }),
        initialize(),
        session(),
      )
      .forRoutes(AuthController);
  }
}
