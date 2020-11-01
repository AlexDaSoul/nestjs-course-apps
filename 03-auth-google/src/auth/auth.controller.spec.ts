import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './passport/google.strategy';
import { AuthService } from './auth.service';
import { INestApplication } from '@nestjs/common';
import { SessionSerializer } from './passport/session.serializer';

describe('AuthController', () => {
  let app: INestApplication;
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, GoogleStrategy, SessionSerializer],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`/GET /auth`, () => {
    return request(app.getHttpServer())
      .get('/auth')
      .expect(302)
      .expect(res => {
        expect(
          res.headers['location'].search('accounts.google.com') > -1,
        ).toBeTruthy();
      });
  });

  it(`/GET /auth/redirect`, () => {
    return request(app.getHttpServer())
      .get('/auth/redirect')
      .expect(302)
      .expect(res => {
        expect(
          res.headers['location'].search('accounts.google.com') > -1,
        ).toBeTruthy();
      });
  });

  it(`/GET /auth/test`, () => {
    return request(app.getHttpServer())
      .get('/auth/test')
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
