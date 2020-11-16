import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import { ServerOptions } from 'socket.io';
import { config } from 'dotenv';
import { RelationsInterceptor } from '@dal';
import { TicketsModule } from './tickets.module';

config();

// HealthCheck settings
process.env.SERVICE_URL = `http://${process.env.TICKETS_HOST}:${process.env.TICKETS_PORT}`;
process.env.CHECK_DB = 'true';

const redisAdapter = redisIoAdapter({
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
});

class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(TicketsModule);

  const options = new DocumentBuilder()
    .setTitle('Tickets')
    .setDescription('The tickets API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.useGlobalInterceptors(new RelationsInterceptor());

  await app.listen(process.env.TICKETS_PORT);
}
bootstrap();
