import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateDTO } from './dto/create-dto';
import { UpdateDTO } from './dto/update-dto';
import { DeleteDTO } from './dto/delete-dto';
import { GetDTO } from './dto/get-dto';
import { TicketsService } from './tickets.service';
import { Ticket } from '@dal/entities/ticket.entity';
import { ManagerDTO } from './dto/manager-dto';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {
    }

    @Post()
    public async create(@Body() body: CreateDTO): Promise<{ id: string }> {
        return await this.ticketsService.createTicket(body);
    }

    @Put()
    public async update(@Body() body: UpdateDTO): Promise<void> {
        return await this.ticketsService.updateTicket(body);
    }

    @Delete()
    public async delete(@Body() body: DeleteDTO): Promise<void> {
        return await this.ticketsService.deleteTicket(body.id);
    }

    @Get()
    public async getAllTickets(): Promise<Ticket[]> {
        return await this.ticketsService.getAllTickets();
    }

    @Get(':id')
    public async getTicketById(@Param() param: GetDTO): Promise<Ticket> {
        return await this.ticketsService.getTicketById(param.id);
    }

    @Get('manager/:id')
    public async getTicketsByManager(@Param() param: ManagerDTO): Promise<Ticket[]> {
        return await this.ticketsService.getTicketsByManager(param);
    }
}
