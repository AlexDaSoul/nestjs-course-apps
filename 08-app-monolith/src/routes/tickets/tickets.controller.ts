import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Ticket } from '@dal/entities/ticket.entity';
import { JwsAuthGuard } from '@jws/guards/jws-auth-guard.service';
import { Role } from '@jws/guards/role.decorator';
import { CreateTicketDTO } from './dto/create-ticket-dto';
import { UpdateTicketDTO } from './dto/update-ticket-dto';
import { TicketsService } from './tickets.service';
import { TicketUuidDTO } from './dto/ticket-uuid-dto';

@ApiTags('tickets')
@ApiHeader({ name: 'autorization' })
@Controller('tickets')
@UseGuards(JwsAuthGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @Role('client')
  public async create(@Body() body: CreateTicketDTO): Promise<{ id: string }> {
    return await this.ticketsService.createTicket(body);
  }

  @Put()
  public async update(@Body() body: UpdateTicketDTO): Promise<void> {
    return await this.ticketsService.updateTicket(body);
  }

  @Delete()
  public async delete(@Body() body: TicketUuidDTO): Promise<void> {
    return await this.ticketsService.deleteTicket(body.id);
  }

  @Get()
  public async getAllTickets(): Promise<Ticket[]> {
    return await this.ticketsService.getAllTickets();
  }

  @Get(':id')
  public async getTicketById(@Param() param: TicketUuidDTO): Promise<Ticket> {
    return await this.ticketsService.getTicketById(param.id);
  }

  @Get('client/:id')
  @Role('client')
  public async getTicketsByClient(
    @Param() param: TicketUuidDTO,
  ): Promise<Ticket[]> {
    return await this.ticketsService.getTicketsByClient(param);
  }

  @Get('manager/:id')
  @Role('manager')
  public async getTicketsByManager(
    @Param() param: TicketUuidDTO,
  ): Promise<Ticket[]> {
    return await this.ticketsService.getTicketsByManager(param);
  }
}
