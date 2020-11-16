import {
  Logger,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@dal/entities/user.entity';
import { UsersDalService } from '@dal/services/users-dal.service';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(private readonly usersDalService: UsersDalService) {}

  public async createUser(user: User): Promise<{ id: string }> {
    const findUserByName = await this.usersDalService.findOne({
      name: user.name,
    });

    if (findUserByName) {
      this.logger.debug(`createUser: User '${user.name}' already exists`);
      throw new HttpException(
        `User '${user.name}' already exists`,
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.usersDalService.insert(user);

    return {
      id: result.identifiers[0].id,
    };
  }

  public async updateUser(user: User): Promise<void> {
    await this.getUserById(user.id);

    const findUserByName = await this.usersDalService.findOne({
      name: user.name,
    });

    if (findUserByName && findUserByName.id !== user.id) {
      this.logger.debug(`updateUser: Not enough rights`);
      throw new HttpException(`Not enough rights`, HttpStatus.FORBIDDEN);
    }

    await this.usersDalService.update(user.id, user);
  }

  public async deleteUser(id: string): Promise<void> {
    const findUser = await this.getUserById(id);

    if (!findUser) {
      this.logger.debug(`deleteUser: User not found`);
      throw new NotFoundException('User not found');
    }

    await this.usersDalService.delete(id);
  }

  public async getUser(user: User): Promise<User> {
    return await this.usersDalService.findOne(user);
  }

  public async getUserById(id: string): Promise<User> {
    const findUser = await this.usersDalService.findOneById(id);

    if (!findUser) {
      this.logger.debug(`getUserById: User not found`);
      throw new NotFoundException('User not found');
    }

    return findUser;
  }

  public async getAllUsers(): Promise<User[]> {
    return await this.usersDalService.findAll();
  }
}
