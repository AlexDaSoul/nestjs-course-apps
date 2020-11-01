import { Module } from '@nestjs/common';
import { AppController } from './routes/app.controller';

@Module({
  controllers: [AppController],
})
export class AppModule {}
