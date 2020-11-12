import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Request,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { JwsAuthGuard } from '@jws/guards/jws-auth-guard.service';
import { User } from '@dal/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-dto';

@ApiTags('auth')
@ApiHeader({ name: 'autorization' })
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: LoginDTO): Promise<string> {
    return await this.authService.login(body);
  }

  @Get('profile')
  @UseGuards(JwsAuthGuard)
  public async getProfile(
    @Request() req: ExpressRequest & { payload: any },
  ): Promise<User> {
    return await this.authService.getUserById(req.payload.id);
  }
}
