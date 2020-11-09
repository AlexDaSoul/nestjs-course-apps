import { Module } from '@nestjs/common';
import { DalModule } from '@dal/dal.module';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';

@Module({
    imports: [DalModule],
    controllers: [ManagersController],
    providers: [ManagersService],
})
export class ManagersModule {
}
