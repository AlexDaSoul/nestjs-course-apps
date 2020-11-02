import { Injectable } from '@nestjs/common';
import { User } from '../user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'chris',
      password: 'secret',
    },
    {
      userId: 3,
      username: 'maria',
      password: 'guess',
    },
  ];

  public async findOne(username: string): Promise<User> {
    return this.users.find(user => user.username === username);
  }
}
