import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
import { RelationsInterceptor } from '@dal';
import { AuthModule } from './auth.module';

config();

// HealthCheck settings
process.env.SERVICE_URL = `http://${process.env.AUTH_HOST}:${process.env.AUTH_PORT}`;

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const options = new DocumentBuilder()
    .setTitle('Tickets')
    .setDescription('The auth API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new RelationsInterceptor());

  await app.listen(process.env.AUTH_PORT);
}
bootstrap();
