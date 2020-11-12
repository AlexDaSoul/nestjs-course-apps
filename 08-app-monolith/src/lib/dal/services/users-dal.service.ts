import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindConditions,
  InsertResult,
  UpdateResult,
  DeleteResult,
} from 'typeorm';
import { User } from '@dal/entities/user.entity';

@Injectable()
export class UsersDalService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  public insert(user: User): Promise<InsertResult> {
    return this.repository.insert(user);
  }

  public update(id: string, user: User): Promise<UpdateResult> {
    return this.repository.update(id, user);
  }

  public delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  public findOneById(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  public findOne(credentials: FindConditions<User>): Promise<User> {
    return this.repository.findOne(credentials);
  }

  public findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
