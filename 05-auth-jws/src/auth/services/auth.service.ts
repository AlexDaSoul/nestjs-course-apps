import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../user.interface';
import { AuthCredentials } from '../auth-credentials-dto';
import { JwtService } from '../../jws/services/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username);

    if (user && user.password === password) {
      return user;
    }
  }

  public async login(credentials: AuthCredentials): Promise<string> {
    const user = await this.validateUser(
      credentials.username,
      credentials.password,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.jwtService.createToken(user);
  }
}
