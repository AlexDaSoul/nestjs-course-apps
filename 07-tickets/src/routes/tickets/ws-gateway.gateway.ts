import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse, OnGatewayInit } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { Ticket } from '@dal/entities/ticket.entity';
import { GetDTO } from './dto/get-dto';
import { TicketsService } from './tickets.service';

@WebSocketGateway()
export class WsGatewayGateway implements OnGatewayInit {
    constructor(private readonly ticketsService: TicketsService) {
    }

    afterInit(server: Server) {
        this.ticketsService.getTicketEvents().subscribe( msg => {
            server.emit('tickets', msg);
        });
    }

    @SubscribeMessage('manager')
    public getManagersTickets(@MessageBody() data: GetDTO): Observable<WsResponse<Ticket>> {
        return this.ticketsService.getTicketEvents()
            .pipe(
                filter(msg => msg && msg?.manager?.id === data.id),
                map(msg => ({ event: 'manager', data: msg })),
            );
    }
}
