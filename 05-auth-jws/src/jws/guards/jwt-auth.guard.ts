import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify, VerifyOptions } from 'jsonwebtoken';
import { Request } from 'express';

const DECODING_OPTIONS: VerifyOptions = {
  algorithms: ['RS256'],
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const token = request.headers['autorization'] as string;

    if (token) {
      try {
        request['payload'] = verify(
          token,
          process.env.JWT_PUB,
          DECODING_OPTIONS,
        );

        return true;
      } catch (error) {
        throw new UnauthorizedException(error.message);
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
