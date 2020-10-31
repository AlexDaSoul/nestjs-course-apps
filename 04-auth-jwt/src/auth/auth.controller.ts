import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest, Express } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthCredentialsDTO } from './auth-credentials-dto';
import { User } from './user.interface';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: AuthCredentialsDTO): Promise<string> {
    return await this.authService.login(body);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  public getProfile(@Request() req: ExpressRequest): Express.User {
    return req.user;
  }
}
