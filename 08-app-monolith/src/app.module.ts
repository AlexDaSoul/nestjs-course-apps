import { Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.module';
import { DalModule } from '@dal/dal.module';
import { JwsModule } from '@jws/jws.module';

@Module({
  imports: [RoutesModule, DalModule, JwsModule],
})
export class AppModule {}
