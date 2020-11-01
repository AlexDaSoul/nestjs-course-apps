import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LinkConverterController } from './link-converter.controller';
import { LinkConverterService } from './link-converter.service';

describe('LinkConverterService', () => {
  let service: LinkConverterService;
  const link =
    'https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D1%80%D1%82%D0%B0%D0%BB:%D0%A2%D0%B5%D0%BA%D1%83%D1%89%D0%B8%D0%B5_%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F';
  const linkConvert =
    'Link https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D1%80%D1%82%D0%B0%D0%BB:%D0%A2%D0%B5%D0%BA%D1%83%D1%89%D0%B8%D0%B5_%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F was decode to https://ru.wikipedia.org/wiki/Портал:Текущие_события';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkConverterController],
      providers: [LinkConverterService],
    }).compile();

    service = module.get<LinkConverterService>(LinkConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('decodeURI', () => {
    it('Success convert', () => {
      jest.spyOn(service, 'decodeURI');
      expect(service.decodeURI(link)).toBe(linkConvert);
    });

    it('Fail decodeURI', () => {
      jest.spyOn(service, 'decodeURI');
      expect(() => {
        service.decodeURI(null);
      }).toThrowError(HttpException);
    });
  });
});
