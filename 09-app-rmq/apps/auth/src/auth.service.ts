import { Logger, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { User } from '@dal';
import { JwsService } from '@jws';
import { LoginDTO } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(process.env.NATS_USER_SERVICE) private readonly client: ClientNats,
    private readonly jwsService: JwsService,
  ) {}

  public async login(credentials: LoginDTO): Promise<string> {
    const user = await this.client.send('getUser', credentials).toPromise();

    if (!user) {
      Logger.debug('Invalid name or password', AuthService.name);
      throw new NotFoundException('Invalid name or password');
    }

    return this.jwsService.createToken({ id: user.id, role: user.role });
  }

  public async getUserById(id: string): Promise<User> {
    return await this.client.send('getUserById', { id }).toPromise();
  }
}
