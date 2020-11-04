import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateDTO } from './dto/create-dto';
import { DeleteDTO } from './dto/delete-dto';
import { GetDTO } from './dto/get-dto';
import { UpdateDTO } from './dto/update-dto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() body: CreateDTO): Promise<{ userId: string }> {
    return await this.userService.createUser(body);
  }

  @Put()
  public async update(@Body() body: UpdateDTO): Promise<void> {
    return await this.userService.updateUser(body);
  }

  @Delete()
  public async delete(@Body() body: DeleteDTO): Promise<void> {
    return await this.userService.deleteUser(body.userId);
  }

  @Get(':userId')
  public async get(@Param() param: GetDTO): Promise<any> {
    return await this.userService.getUserById(param.userId);
  }
}
