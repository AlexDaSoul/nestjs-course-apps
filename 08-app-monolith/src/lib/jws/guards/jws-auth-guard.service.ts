import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify, VerifyOptions } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';

const DECODING_OPTIONS: VerifyOptions = {
  algorithms: ['RS256'],
};

@Injectable()
export class JwsAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const token = request.headers['autorization'] as string;
    const role = this.reflector.get<string>('role', context.getHandler());

    if (token) {
      try {
        const payload: any = verify(
          token,
          process.env.JWT_PUB,
          DECODING_OPTIONS,
        );

        request['payload'] = payload;

        return !role || (role && payload.role === role);
      } catch (error) {
        throw new UnauthorizedException(error.message);
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
