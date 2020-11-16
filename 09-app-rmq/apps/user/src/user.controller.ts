import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from '@dal';
import { JwsAuthGuard } from '@jws';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdateUserDTO } from './dto/update-user-dto';
import { UserUuidDTO } from './dto/user-uuid-dto';
import { UserService } from './user.service';

@ApiTags('users')
@ApiHeader({ name: 'autorization' })
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  public async create(@Body() body: CreateUserDTO): Promise<{ id: string }> {
    return await this.usersService.createUser(body);
  }

  @Put()
  @UseGuards(JwsAuthGuard)
  public async update(@Body() body: UpdateUserDTO): Promise<void> {
    return await this.usersService.updateUser(body);
  }

  @Delete()
  @UseGuards(JwsAuthGuard)
  public async delete(@Body() body: UserUuidDTO): Promise<void> {
    return await this.usersService.deleteUser(body.id);
  }

  @Get()
  @UseGuards(JwsAuthGuard)
  public async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JwsAuthGuard)
  public async getUserById(@Param() param: UserUuidDTO): Promise<User> {
    return await this.usersService.getUserById(param.id);
  }

  @MessagePattern('getUser')
  public async getUser(@Payload() user: User): Promise<User> {
    return await this.usersService.getUser(user);
  }

  @MessagePattern('getUserById')
  public async getUserByIdNoti(@Payload() data: UserUuidDTO): Promise<User> {
    return await this.usersService.getUserById(data.id);
  }
}
