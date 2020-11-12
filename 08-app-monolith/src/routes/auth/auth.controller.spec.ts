import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './services/user.service';
import { INestApplication } from '@nestjs/common';
import { JwsModule } from '@jws/jws.module';
import { PemCertService } from '@jws/services/pem-cert.service';

describe('AuthController', () => {
  let app: INestApplication;
  let controller: AuthController;
  let pemCertService: PemCertService;

  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiY2hyaXMiLCJwYXNzd29yZCI6InNlY3JldCIsImlhdCI6MTYwNDMwMjYzMH0.qQYlTuFnnn0NDAoqn7uIU2QvBdX-4iC5jkTHgzN-KE_0By8u2pIhEUgv2IiMwcxhDLfbRShOgYNrXc807h0UU0hlwUGzcukwYmURZD-E3BeX81jP_EUNbBEVyoKN0TOUGcKzZ2Q3N9swvzsuyU583NwTs-EgjgSGthyQsMp0DDP06kbF_Qnw9lFcOLJsrXeC2FBT-L9fPMP48xNjlNbJHrY52qpqNz_ZbWeJnukVNQ_uY3KGzArcAL7nfM0__VTaWlp3qk7tIrrbTnDKE5KXv-mpOsf_B3QEN7SZyylmERqPpVQIh91C8_u_t3-O7utAn_PcKwmj4f5GTv8XyDAfk_3Tnyr6pElioFblD6L-oACMQPWKvFyFeQ7DSl5vHmrQKzQMNGdojLFRGXUs4ifLOoRkkgN1IBjmPNNxSeqmLHUNfyX2rMSH0TG6PY93TV97z2gY62lmM0bCRu4wC07gOrdRLNw7pm4Czo0Vaz5eIcLI3ipxPxmiSAPpUzGXnj9y';
  const creds = {
    username: 'chris',
    password: 'secret',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwsModule],
      controllers: [AuthController],
      providers: [AuthService, UserService],
    }).compile();

    pemCertService = module.get<PemCertService>(PemCertService);
    controller = module.get<AuthController>(AuthController);

    const keys = await pemCertService.createCertificate();

    process.env.JWT_PUB = keys.JWT_PUB;
    process.env.JWT_PRIV = keys.JWT_PRIV;

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/POST /login', () => {
    it(`Success`, () => {
      return request(app.getHttpServer())
        .post('/login')
        .send(creds)
        .expect(201)
        .expect(res => {
          expect(res.text.length).toBeTruthy();
        });
    });

    it(`Error`, () => {
      return request(app.getHttpServer())
        .post('/login')
        .expect(404);
    });
  });

  describe('/GET /profile', () => {
    it(`Success`, () => {
      return request(app.getHttpServer())
        .get('/profile')
        .set('Autorization', token)
        .expect(200)
        .expect(res => {
          expect(res.body.userId).toBe(2);
          expect(res.body.username).toBe(creds.username);
        });
    });

    it(`Error`, done => {
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
