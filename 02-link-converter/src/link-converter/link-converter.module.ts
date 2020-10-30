import { Module } from '@nestjs/common';
import { LinkConverterController } from './link-converter.controller';
import { LinkConverterService } from './link-converter.service';

@Module({
  controllers: [LinkConverterController],
  providers: [LinkConverterService],
})
export class LinkConverterModule {}
