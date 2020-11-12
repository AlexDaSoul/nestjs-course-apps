import { Module, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { User } from './entities/user.entity';
import { Ticket } from './entities/ticket.entity';
import { UsersDalService } from './services/users-dal.service';
import { TicketsDalService } from './services/tickets-dal.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'tickets',
      entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      subscribers: [__dirname + '/subscribers/**/*.subscriber{.ts,.js}'],
      synchronize: false,
      keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature([User, Ticket]),
  ],
  providers: [UsersDalService, TicketsDalService],
  exports: [UsersDalService, TicketsDalService],
})
export class DalModule implements OnApplicationBootstrap {
  private logger: Logger = new Logger(DalModule.name);

  constructor(private connection: Connection) {}

  async onApplicationBootstrap() {
    try {
      await this.connection.runMigrations({ transaction: 'each' });
      this.logger.log('Migrations success');
    } catch (error) {
      throw error;
    }
  }
}
