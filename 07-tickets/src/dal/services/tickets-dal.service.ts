import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository, InsertResult } from 'typeorm';
import { Manager } from '@dal/entities/manager.entity';
import { Ticket } from '@dal/entities/ticket.entity';

@Injectable()
export class TicketsDalService {
    constructor(
        @InjectRepository(Ticket)
        private repository: Repository<Ticket>,
    ) {
    }

    public insert(ticket: Ticket): Promise<InsertResult> {
        return this.repository.insert(ticket);
    }

    public update(ticket: Ticket): Promise<Ticket[]> {
        return this.repository.save([ticket]);
    }

    public remove(ticket: Ticket): Promise<Ticket> {
        return this.repository.remove(ticket);
    }

    public findAllByManagerId(manager: Manager): Promise<Ticket[]> {
        return this.repository.find({ manager });
    }

    public findById(id: string): Promise<Ticket> {
        return this.repository.findOne(id, { relations: ['manager'] });
    }

    public findOne(credentials: FindConditions<Ticket>): Promise<Ticket> {
        return this.repository.findOne(credentials, { relations: ['manager'] });
    }

    public findAll(): Promise<Ticket[]> {
        return this.repository.find({ relations: ['manager'] });
    }
}
