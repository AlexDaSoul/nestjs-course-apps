import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify, SignOptions } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

@Injectable()
export class JwtService {
  public createToken(
    payload: any,
    expiresIn: number | string = process.env.JWT_EXPIRES,
  ): string {
    const options: SignOptions = {
      algorithm: 'RS256',
    };

    if (expiresIn) {
      options.expiresIn = expiresIn;
    }

    return sign(payload, process.env.JWT_PRIV, options);
  }

  public verifyToken(token: string): any {
    try {
      return verify(token, process.env.JWT_PUB, {
        algorithms: ['RS256'],
      });
    } catch (ignored) {
      throw new UnauthorizedException();
    }
  }
}
