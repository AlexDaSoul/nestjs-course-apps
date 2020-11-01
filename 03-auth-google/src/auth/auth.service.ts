import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { AuthResponse } from './passport/user.interface';

@Injectable()
export class AuthService {
  public googleLogin(req: Request): AuthResponse {
    if (!req.user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
