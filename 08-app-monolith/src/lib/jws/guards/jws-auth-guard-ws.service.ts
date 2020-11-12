import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify, VerifyOptions } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';

const DECODING_OPTIONS: VerifyOptions = {
  algorithms: ['RS256'],
};

@Injectable()
export class JwsAuthWsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToWs();
    const client = ctx.getClient();
    const token = client.handshake.headers['autorization'] as string;
    const role = this.reflector.get<string>('role', context.getHandler());

    if (token) {
      try {
        const payload: any = verify(
          token,
          process.env.JWT_PUB,
          DECODING_OPTIONS,
        );

        client.handshake['payload'] = payload;

        return !role || (role && payload.role === role);
      } catch (error) {
        client.error(error.message);
      }
    } else {
      client.error('Autorization header is not found');
    }
  }
}
