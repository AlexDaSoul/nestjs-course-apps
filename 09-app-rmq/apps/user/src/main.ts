import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
import { RelationsInterceptor } from '@dal';
import { UserModule } from './user.module';

config();

// HealthCheck settings
process.env.SERVICE_URL = `http://${process.env.USER_HOST}:${process.env.USER_PORT}`;
process.env.CHECK_DB = 'true';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: `${process.env.NATS_HOST}:${process.env.NATS_PORT}`,
      queue: process.env.NATS_USER_QUEUE,
    },
  });

  const options = new DocumentBuilder()
    .setTitle('Tickets')
    .setDescription('The user API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new RelationsInterceptor());

  await app.startAllMicroservicesAsync();
  await app.listen(process.env.USER_PORT);
}
bootstrap();
