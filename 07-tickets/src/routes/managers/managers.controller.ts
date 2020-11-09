import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateDTO } from './dto/create-dto';
import { DeleteDTO } from './dto/delete-dto';
import { GetByIdDTO } from './dto/get-by-id-dto';
import { UpdateDTO } from './dto/update-dto';
import { ManagersService } from './managers.service';
import { Manager } from '@dal/entities/manager.entity';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  public async create(@Body() body: CreateDTO): Promise<{ id: string }> {
    return await this.managersService.createManager(body);
  }

  @Put()
  public async update(@Body() body: UpdateDTO): Promise<void> {
    return await this.managersService.updateManager(body);
  }

  @Delete()
  public async delete(@Body() body: DeleteDTO): Promise<void> {
    return await this.managersService.deleteManager(body.id);
  }

  @Get()
  public async getAllManagers(): Promise<Manager[]> {
    return await this.managersService.getAllManagers();
  }

  @Get(':id')
  public async getManagerById(@Param() param: GetByIdDTO): Promise<Manager> {
    return await this.managersService.getManagerById(param.id);
  }
}
