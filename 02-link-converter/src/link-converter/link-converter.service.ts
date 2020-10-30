import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class LinkConverterService {
  public decodeURI(link: string): string {
    if (link) {
      return `Link ${link} was decode to ${decodeURI(link)}`;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Link parameter is empty',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
