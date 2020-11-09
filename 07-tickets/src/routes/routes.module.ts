import { Module } from '@nestjs/common';
import { ManagersModule } from './managers/managers.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
    imports: [ManagersModule, TicketsModule],
})
export class RoutesModule {
}
