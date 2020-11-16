import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Socket } from 'socket.io';
import { Ticket } from '@dal/entities/ticket.entity';
import { RelationsInterceptor } from '@dal/relations.interceptor';
import { JwsAuthWsGuard } from '@jws/guards/jws-auth-guard-ws.service';
import { TicketsService } from './tickets.service';
import { Role } from '@jws/guards/role.decorator';

@WebSocketGateway()
@UseGuards(JwsAuthWsGuard)
@UseInterceptors(RelationsInterceptor)
export class WsGatewayGateway {
  constructor(private readonly ticketsService: TicketsService) {}

  @SubscribeMessage('tickets')
  public getTickets(): Observable<WsResponse<Ticket>> {
    return this.ticketsService
      .getTicketEvents()
      .pipe(map(msg => ({ event: 'tickets', data: msg })));
  }

  @SubscribeMessage('client')
  @Role('client')
  public getClientTickets(
    @ConnectedSocket() client: Socket,
  ): Observable<WsResponse<Ticket>> {
    const payload = client.handshake.headers['payload'];

    return this.ticketsService.getTicketEvents().pipe(
      filter(msg => msg && msg?.client?.id === payload?.id),
      map(msg => ({ event: 'client', data: msg })),
    );
  }

  @SubscribeMessage('manager')
  @Role('manager')
  public getMaqnagerTickets(
    @ConnectedSocket() client: Socket,
  ): Observable<WsResponse<Ticket>> {
    const payload = client.handshake.headers['payload'];

    return this.ticketsService.getTicketEvents().pipe(
      filter(msg => msg && msg?.manager?.id === payload?.id),
      map(msg => ({ event: 'manager', data: msg })),
    );
  }
}
