import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Manager } from '@dal/entities/manager.entity';

@Injectable()
export class ManagersDalService {
    constructor(
        @InjectRepository(Manager)
        private repository: Repository<Manager>,
    ) {
    }

    public insert(manager: Manager): Promise<InsertResult> {
        return this.repository.insert(manager);
    }

    public update(id: string, manager: Manager): Promise<UpdateResult> {
        return this.repository.update(id, manager);
    }

    public delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

    public findOneById(id: string): Promise<Manager> {
        return this.repository.findOne(id);
    }

    public findOne(credentials: FindConditions<Manager>): Promise<Manager> {
        return this.repository.findOne(credentials);
    }

    public findAll(): Promise<Manager[]> {
        return this.repository.find();
    }
}
