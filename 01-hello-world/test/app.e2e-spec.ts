import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`CRUD test`, () => {
    return request(app.getHttpServer())
      .get('/app/state')
      .expect(res => {
        expect(res.text).toBe('Hello undefined!');
      })
      .then(() => request(app.getHttpServer()).put('/app/simple/People'))
      .then(() =>
        request(app.getHttpServer())
          .get('/app/state')
          .expect(res => {
            expect(res.text).toBe('Hello People!');
          }),
      )
      .then(() => request(app.getHttpServer()).delete('/app/simple'))
      .then(() =>
        request(app.getHttpServer())
          .get('/app/state')
          .expect(res => {
            expect(res.text).toBe('Hello undefined!');
          }),
      );
  });
});
