import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token;
  const creds = {
    username: 'chris',
    password: 'secret',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`Test JWT auth`, done => {
    request(app.getHttpServer())
      .post('/login')
      .send(creds)
      .expect(201)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        token = res.text;

        done();
      });
  });

  it(`Test JWT guard`, done => {
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

  afterAll(async () => {
    await app.close();
  });
});
