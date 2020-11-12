import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository, InsertResult } from 'typeorm';
import { User } from '@dal/entities/user.entity';
import { Ticket } from '@dal/entities/ticket.entity';

@Injectable()
export class TicketsDalService {
  constructor(
    @InjectRepository(Ticket)
    private repository: Repository<Ticket>,
  ) {}

  public insert(ticket: Ticket): Promise<InsertResult> {
    return this.repository.insert(ticket);
  }

  public update(ticket: Ticket): Promise<Ticket[]> {
    return this.repository.save([ticket]);
  }

  public remove(ticket: Ticket): Promise<Ticket> {
    return this.repository.remove(ticket);
  }

  public findAllByClient(client: User): Promise<Ticket[]> {
    return this.repository.find({ client });
  }

  public findAllByManager(manager: User): Promise<Ticket[]> {
    return this.repository.find({ manager });
  }

  public findById(id: string): Promise<Ticket> {
    return this.repository.findOne(id, { relations: ['client', 'manager'] });
  }

  public findOne(credentials: FindConditions<Ticket>): Promise<Ticket> {
    return this.repository.findOne(credentials, {
      relations: ['client', 'manager'],
    });
  }

  public findAll(): Promise<Ticket[]> {
    return this.repository.find({ relations: ['client', 'manager'] });
  }
}
