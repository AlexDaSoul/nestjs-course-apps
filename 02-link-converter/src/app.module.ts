import { Module } from '@nestjs/common';
import { LinkConverterModule } from './link-converter/link-converter.module';

@Module({
  imports: [LinkConverterModule],
})
export class AppModule {}
