import { Controller, Get, Req, UseGuards, Session } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Express } from 'express';
// import { SessionData } from 'express-session';
import { AuthService } from './auth.service';
import { LoginGuard } from './guards/login.guard';
import { SessionGuard } from './guards/session.guard';
import { AuthResponse } from './passport/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  public async googleAuth(@Req() req: Request) {}

  @Get('redirect')
  @UseGuards(LoginGuard)
  public googleAuthRedirect(@Req() req: Request): AuthResponse {
    return this.authService.googleLogin(req);
  }

  @Get('test')
  @UseGuards(SessionGuard)
  public get(
    @Session() session: Express.SessionData,
  ): { message: string; data: Express.SessionData } {
    return {
      message: 'You are logged in!',
      data: session,
    };
  }
}
