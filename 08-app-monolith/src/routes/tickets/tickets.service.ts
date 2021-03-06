import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Ticket, TicketEvent } from '@dal/entities/ticket.entity';
import { User } from '@dal/entities/user.entity';
import { TicketsDalService } from '@dal/services/tickets-dal.service';

@Injectable()
export class TicketsService {
  private ticketEvents: Subject<Ticket> = new Subject();

  constructor(private readonly ticketsDalService: TicketsDalService) {}

  public async createTicket(ticket: Ticket): Promise<{ id: string }> {
    const result = await this.ticketsDalService.insert(ticket);

    this.ticketEvents.next({
      ...ticket,
      ...result.raw[0],
      event: TicketEvent.INSERT,
    });

    return {
      id: result.identifiers[0].id,
    };
  }

  public async updateTicket(ticket: Ticket, userId: string): Promise<void> {
    const findTicket = await this.getTicketById(ticket.id);

    if (!findTicket) {
      throw new NotFoundException('Ticket not found');
    }

    if (![findTicket.manager?.id, findTicket.client?.id].includes(userId)) {
      throw new UnauthorizedException('Not enough rights');
    }

    await this.ticketsDalService.update(ticket);

    this.ticketEvents.next({
      ...(await this.ticketsDalService.findById(ticket.id)),
      event: TicketEvent.UPDATE,
    });
  }

  public async deleteTicket(id: string, userId: string): Promise<void> {
    const findTicket = await this.getTicketById(id);

    if (!findTicket) {
      throw new NotFoundException('Ticket not found');
    }

    if (![findTicket.manager?.id, findTicket.client?.id].includes(userId)) {
      throw new UnauthorizedException('Not enough rights');
    }

    await this.ticketsDalService.remove(findTicket);

    this.ticketEvents.next({
      ...findTicket,
      event: TicketEvent.REMOVE,
    });
  }

  public async getTicketsByClient(user: User): Promise<Ticket[]> {
    const result = await this.ticketsDalService.findAllByClient(user);

    if (!result) {
      throw new NotFoundException('Ticket not found');
    }

    return result;
  }

  public async getTicketsByManager(user: User): Promise<Ticket[]> {
    const result = await this.ticketsDalService.findAllByManager(user);

    if (!result) {
      throw new NotFoundException('Ticket not found');
    }

    return result;
  }

  public async getTicketById(id: string): Promise<Ticket> {
    const result = await this.ticketsDalService.findById(id);

    if (!result) {
      throw new NotFoundException('Ticket not found');
    }

    return result;
  }

  public async getAllTickets(): Promise<Ticket[]> {
    return await this.ticketsDalService.findAll();
  }

  public getTicketEvents(): Observable<Ticket> {
    return this.ticketEvents.asObservable();
  }
}
