import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createUser(user: User): Promise<{ userId: string }> {
    const findUser = await this.getUser(user);

    if (findUser) {
      throw new HttpException(
        `User '${user.username}' already exists`,
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.userRepository.insert(user);

    return {
      userId: result.identifiers[0].userId,
    };
  }

  public async updateUser(user: User): Promise<void> {
    const findUser = await this.getUserById(user.userId);

    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    const findUserByName = await this.getUser({ username: user.username });

    if (findUserByName && findUserByName.userId !== user.userId) {
      throw new HttpException(
        `User '${user.username}' already exists`,
        HttpStatus.FORBIDDEN,
      );
    }

    await this.userRepository.update(findUser.userId, user);
  }

  public async deleteUser(userId: string): Promise<void> {
    const findUser = await this.getUserById(userId);

    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(findUser.userId);
  }

  public async getUserById(userId: string): Promise<User> {
    return await this.userRepository.findOne(userId);
  }

  public async getUser(credentials: FindConditions<User>): Promise<User> {
    return await this.userRepository.findOne(credentials);
  }
}
