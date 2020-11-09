import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Manager } from '@dal/entities/manager.entity';
import { ManagersDalService } from '@dal/services/managers-dal.service';

@Injectable()
export class ManagersService {
  constructor(private readonly managersDalService: ManagersDalService) {}

  public async createManager(manager: Manager): Promise<{ id: string }> {
    const findManagerByName = await this.managersDalService.findOne({
      name: manager.name,
    });

    if (findManagerByName) {
      throw new HttpException(
        `Manager '${manager.name}' already exists`,
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.managersDalService.insert(manager);

    return {
      id: result.identifiers[0].id,
    };
  }

  public async updateManager(manager: Manager): Promise<void> {
    await this.getManagerById(manager.id);

    const findManagerByName = await this.managersDalService.findOne({
      name: manager.name,
    });

    if (findManagerByName && findManagerByName.id !== manager.id) {
      throw new HttpException(
        `Manager '${manager.name}' already exists`,
        HttpStatus.FORBIDDEN,
      );
    }

    await this.managersDalService.update(manager.id, manager);
  }

  public async deleteManager(id: string): Promise<void> {
    const findManager = await this.getManagerById(id);

    if (!findManager) {
      throw new NotFoundException('Manager not found');
    }

    await this.managersDalService.delete(id);
  }

  public async getManagerById(id: string): Promise<Manager> {
    const result = await this.managersDalService.findOneById(id);

    if (!result) {
      throw new NotFoundException('Manager not found');
    }

    return result;
  }

  public async getAllManagers(): Promise<Manager[]> {
    return await this.managersDalService.findAll();
  }
}
