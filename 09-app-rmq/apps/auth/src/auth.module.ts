import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import * as Leader from 'redis-leader';
import { createClient } from 'redis';
import { PemCertService, JwsModule } from '@jws';
import { HealthModule } from '@health';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

config();

const redisClient = createClient(
  `redis://${ process.env.REDIS_HOST }:${ process.env.REDIS_PORT }`,
);

@Module({
  imports: [
    JwsModule,
    HealthModule,
    ClientsModule.register([
      {
        name: process.env.RMQ_USER_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [`${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
          queue: process.env.RMQ_USER_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements OnApplicationBootstrap {
  private readonly logger = new Logger(AuthModule.name);

  private readonly leader = new Leader(redisClient, {
    key: process.env.RMQ_AUTH_SERVICE,
    ttl: process.env.REDIS_LEADER_TTL,
  });

  constructor(private readonly pemService: PemCertService) {
    this.leader.elect();
  }

  async onApplicationBootstrap() {
    try {
      this.leader.isLeader(async (err, isLeader) => {
        this.logger.debug(`isLeader: ${ isLeader }`, AuthModule.name);

        if (isLeader) {
          const keys = await this.pemService.createCertificate();

          process.env.JWT_PUB = keys.JWT_PUB;
          process.env.JWT_PRIV = keys.JWT_PRIV;

          this.pemService.setKeys(keys);
        } else {
          this.pemService.getKeys();
        }
      });
    } catch (error) {
      this.logger.error(error, AuthModule.name);
      process.exit(1);
    }
  }
}
