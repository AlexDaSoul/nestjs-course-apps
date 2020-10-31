import * as request from 'supertest';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { INestApplication } from '@nestjs/common';

describe('AuthController', () => {
  let app: INestApplication;
  let controller: AuthController;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiY2hyaXMiLCJwYXNzd29yZCI6InNlY3JldCIsImlhdCI6MTYwNDE0MzcxOX0.v2Lg9tPtWflO5yki5MgiqRuMuUJPDK8Ve73GK2kmARI';
  const creds = {
    username: 'chris',
    password: 'secret',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy, UserService],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/POST /login', () => {
    it(`/POST /login success`, done => {
      request(app.getHttpServer())
        .post('/login')
        .send(creds)
        .expect(201)
        .expect(res => {
          expect(res.text.length).toBeTruthy();
        })
        .end(done);
    });

    it(`/POST /login error`, done => {
      request(app.getHttpServer())
        .post('/login')
        .expect(404, done);
    });
  });

  describe('/GET /profile', () => {
    it(`/GET /profile success`, done => {
      request(app.getHttpServer())
        .get('/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect(res => {
          expect(res.body.userId).toBe(2);
          expect(res.body.username).toBe(creds.username);
        })
        .end(done);
    });

    it(`/GET /profile error`, done => {
      request(app.getHttpServer())
        .get('/profile')
        .expect(401)
        .end(done);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
