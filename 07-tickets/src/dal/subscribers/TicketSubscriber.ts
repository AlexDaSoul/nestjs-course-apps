import {
  EventSubscriber,
  EntitySubscriberInterface,
  Connection,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { Subject } from 'rxjs';
import { Ticket, TicketEvent } from '../entities/ticket.entity';

@EventSubscriber()
export class TicketSubscriber implements EntitySubscriberInterface<Ticket> {
  private removingTicket: Ticket;
  public static ticketEvents: Subject<Ticket> = new Subject();

  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Ticket;
  }

  afterInsert(event: InsertEvent<Ticket>) {
    event.entity.event = TicketEvent.INSERT;
    TicketSubscriber.ticketEvents.next(event.entity);
  }

  afterUpdate(event: UpdateEvent<Ticket>) {
    event.entity.event = TicketEvent.UPDATE;
    TicketSubscriber.ticketEvents.next(event.entity);
  }

  afterRemove(event: RemoveEvent<Ticket>) {
    event.databaseEntity.event = TicketEvent.REMOVE;
    TicketSubscriber.ticketEvents.next({
      ...event.databaseEntity,
      id: event.entityId,
    });
  }
}
