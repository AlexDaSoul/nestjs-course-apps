import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppController } from './app.controller';

describe('AppController', () => {
  let app: INestApplication;
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`/GET /app/simple`, () => {
    return request(app.getHttpServer())
      .get('/app/simple')
      .expect(200)
      .expect(res => {
        expect(res.text).toBe('Hello World!');
      });
  });

  it(`/GET /app/simple/:name`, () => {
    return request(app.getHttpServer())
      .get('/app/simple/World')
      .expect(200)
      .expect(res => {
        expect(res.text).toBe('Hello World!');
      });
  });

  it(`/GET /app/adv with param`, () => {
    return request(app.getHttpServer())
      .get('/app/adv?name=World')
      .expect(200)
      .expect(res => {
        expect(res.text).toBe('Hello World!');
      });
  });

  it(`/POST /app/simple`, () => {
    return request(app.getHttpServer())
      .post('/app/simple')
      .send({ name: 'World' })
      .expect(201)
      .expect(res => {
        expect(res.text).toBe('Hello World!');
      });
  });

  it(`/PUT /app/simple/:name`, () => {
    return request(app.getHttpServer())
      .put('/app/simple/People')
      .expect(200)
      .expect(res => {
        expect(controller['helloWorldState']).toBe('People');
        expect(res.text).toBe('Hello World state was changed to People');
      });
  });

  it(`/DELETE /app/simple`, () => {
    return request(app.getHttpServer())
      .delete('/app/simple')
      .expect(200)
      .expect(res => {
        expect(controller['helloWorldState']).toBeUndefined();
        expect(res.text).toBe('Hello World state was deleted');
      });
  });

  it(`/GET /app/state`, () => {
    return request(app.getHttpServer())
      .get('/app/state')
      .expect(200)
      .expect(res => {
        expect(res.text).toBe('Hello undefined!');
      });
  });

  it(`getHelloText`, () => {
    expect(controller['getHelloText']('World')).toBe('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});
