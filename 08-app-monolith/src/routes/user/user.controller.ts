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
import { User } from '@dal/entities/user.entity';
import { JwsAuthGuard } from '@jws/guards/jws-auth-guard.service';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdateUserDTO } from './dto/update-user-dto';
import { UserUuidDTO } from './dto/user-uuid-dto';
import { UserService } from './user.service';

@ApiTags('users')
@ApiHeader({ name: 'autorization' })
@Controller('users')
@UseGuards(JwsAuthGuard)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  public async create(@Body() body: CreateUserDTO): Promise<{ id: string }> {
    return await this.usersService.createUser(body);
  }

  @Put()
  public async update(@Body() body: UpdateUserDTO): Promise<void> {
    return await this.usersService.updateUser(body);
  }

  @Delete()
  public async delete(@Body() body: UserUuidDTO): Promise<void> {
    return await this.usersService.deleteUser(body.id);
  }

  @Get()
  public async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  public async getUserById(@Param() param: UserUuidDTO): Promise<User> {
    return await this.usersService.getUserById(param.id);
  }
}
