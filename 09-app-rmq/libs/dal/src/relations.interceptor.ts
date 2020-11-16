import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket } from '@dal/entities/ticket.entity';
import { User } from '@dal/entities/user.entity';

type TicketType = Ticket | Ticket[];

@Injectable()
export class RelationsInterceptor implements NestInterceptor<TicketType> {
  private replacer(ticket: Ticket): Ticket {
    if (ticket?.client) {
      ticket.client = ticket.client.id as User;
    }

    if (ticket?.manager) {
      ticket.manager = ticket.manager.id as User;
    }

    return ticket;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<TicketType> {
    return next.handle().pipe(
      map(data => {
        const ticketData = data?.data ? data.data : data;
        const isArray = Array.isArray(ticketData);

        if (isArray) {
          (<Ticket[]>ticketData).forEach(ticket => {
            this.replacer(ticket);
          });
        } else {
          this.replacer(ticketData);
        }

        return data;
      }),
    );
  }
}
