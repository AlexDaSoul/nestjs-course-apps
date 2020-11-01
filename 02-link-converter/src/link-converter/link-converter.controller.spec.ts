import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { LinkConverterController } from './link-converter.controller';
import { LinkConverterService } from './link-converter.service';

describe('LinkConverterController', () => {
  let app: INestApplication;
  let controller: LinkConverterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkConverterController],
      providers: [LinkConverterService],
    }).compile();

    controller = module.get<LinkConverterController>(LinkConverterController);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`/POST /converter`, () => {
    return request(app.getHttpServer())
      .post('/converter')
      .send({
        link:
          'https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D1%80%D1%82%D0%B0%D0%BB:%D0%A2%D0%B5%D0%BA%D1%83%D1%89%D0%B8%D0%B5_%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F',
      })
      .expect(201)
      .expect(res => {
        expect(res.text).toBe(
          'Link https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D1%80%D1%82%D0%B0%D0%BB:%D0%A2%D0%B5%D0%BA%D1%83%D1%89%D0%B8%D0%B5_%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F was decode to https://ru.wikipedia.org/wiki/Портал:Текущие_события',
        );
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
