import { Controller, Post, Body } from '@nestjs/common';
import { LinkConverterService } from './link-converter.service';

@Controller('link-converter')
export class LinkConverterController {
  constructor(private readonly linkConverterService: LinkConverterService) {}

  // https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D1%80%D1%82%D0%B0%D0%BB:%D0%A2%D0%B5%D0%BA%D1%83%D1%89%D0%B8%D0%B5_%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F
  @Post()
  public convert(@Body('link') link: string): string {
    return this.linkConverterService.decodeURI(link);
  }
}
