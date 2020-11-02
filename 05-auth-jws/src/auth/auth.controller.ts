import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './services/auth.service';
import { AuthCredentialsDTO } from './auth-credentials-dto';
import { User } from './user.interface';
import { JwtAuthGuard } from '../jws/guards/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: AuthCredentialsDTO): Promise<string> {
    return await this.authService.login(body);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  public getProfile(@Request() req: ExpressRequest & { payload: any }): User {
    return req.payload;
  }
}
