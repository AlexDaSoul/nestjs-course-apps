import {
  Logger,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Ticket, TicketEvent } from '@dal/entities/ticket.entity';
import { User } from '@dal/entities/user.entity';
import { TicketsDalService } from '@dal/services/tickets-dal.service';

@Injectable()
export class TicketsService {
  private ticketEvents: Subject<Ticket> = new Subject();
  private readonly logger: Logger = new Logger(TicketsService.name);

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
    await this.findTicket(ticket.id, userId, 'updateTicket');
    await this.ticketsDalService.update(ticket);

    this.ticketEvents.next({
      ...(await this.ticketsDalService.findById(ticket.id)),
      event: TicketEvent.UPDATE,
    });
  }

  public async deleteTicket(id: string, userId: string): Promise<void> {
    const findTicket = await this.findTicket(id, userId, 'deleteTicket');

    await this.ticketsDalService.remove(findTicket);

    this.ticketEvents.next({
      ...findTicket,
      event: TicketEvent.REMOVE,
    });
  }

  public async getTicketsByClient(user: User): Promise<Ticket[]> {
    const result = await this.ticketsDalService.findAllByClient(user);

    if (!result) {
      this.logger.debug(`getTicketsByClient: Ticket not found`);
      throw new NotFoundException('Ticket not found');
    }

    return result;
  }

  public async getTicketsByManager(user: User): Promise<Ticket[]> {
    const result = await this.ticketsDalService.findAllByManager(user);

    if (!result) {
      this.logger.debug(`getTicketsByManager: Ticket not found`);
      throw new NotFoundException('Ticket not found');
    }

    return result;
  }

  public async getTicketById(id: string): Promise<Ticket> {
    const result = await this.ticketsDalService.findById(id);

    if (!result) {
      this.logger.debug(`getTicketById: Ticket not found`);
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

  private async findTicket(
    data: string,
    userId: string,
    method: string,
  ): Promise<Ticket> {
    const findTicket = await this.getTicketById(data);

    if (!findTicket) {
      this.logger.debug(`${method}: Ticket not found`);
      throw new NotFoundException('Ticket not found');
    }

    if (![findTicket.manager?.id, findTicket.client?.id].includes(userId)) {
      this.logger.debug(`${method}: Not enough rights`);
      throw new UnauthorizedException('Not enough rights');
    }

    return findTicket;
  }
}
