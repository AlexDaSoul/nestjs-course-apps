import { Module, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { User } from './entities/user.entity';
import { Ticket } from './entities/ticket.entity';
import { UsersDalService } from './services/users-dal.service';
import { TicketsDalService } from './services/tickets-dal.service';
import { Initial1604563177901 } from '@dal/migrations/1604563177901-Initial';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: +process.env.PGPORT || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'tickets',
      entities: [User, Ticket],
      migrations: [Initial1604563177901],
      synchronize: false,
      keepConnectionAlive: true,
      autoLoadEntities: true,
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
