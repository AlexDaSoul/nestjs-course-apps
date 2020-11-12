import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@dal/entities/user.entity';
import { JwsService } from '@jws/services/jws.service';
import { LoginDTO } from './dto/login-dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwsService: JwsService,
  ) {}

  public async login(credentials: LoginDTO): Promise<string> {
    const user = await this.userService.getUser(credentials);

    if (!user) {
      throw new NotFoundException('Invalid name or password');
    }

    return this.jwsService.createToken({ id: user.id, role: user.role });
  }

  public async getUserById(id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }
}
