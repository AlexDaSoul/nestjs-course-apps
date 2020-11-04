import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { User } from 'src/user/entities/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const userId = 'c73a0954-8fa9-413c-afff-d78bc94d1d3f';
  const users: User[] = [
    {
      username: 'User',
      password: '1234',
    },
    {
      username: 'User 1',
      password: '1234',
    },
  ];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('POST', () => {
    it('Success', done => {
      users.forEach((user, i) => {
        request(app.getHttpServer())
          .post('/registration')
          .send(user)
          .expect(201)
          .expect(res => {
            users[i].userId = res.body.userId;
            expect(res.body.userId).toBeTruthy();
          })
          .end(done);
      });
    });

    it(`User '${users[0].username}' already exists error`, () => {
      return request(app.getHttpServer())
        .post('/registration')
        .send(users[0])
        .expect(403);
    });
  });

  describe('GET', () => {
    it('Success', () => {
      return request(app.getHttpServer())
        .get(`/registration/${users[0].userId}`)
        .expect(200)
        .expect(res => {
          expect(res.body.username).toBe(users[0].username);
        });
    });

    it('Not Found', () => {
      return request(app.getHttpServer())
        .get(`/registration`)
        .expect(404);
    });
  });

  describe('PUT', () => {
    it('Success', () => {
      return request(app.getHttpServer())
        .put('/registration')
        .send({
          ...users[0],
          username: 'User New',
        })
        .expect(200)
        .expect(res => {
          expect(res.text === '').toBeTruthy();
        });
    });

    it('User not found', () => {
      return request(app.getHttpServer())
        .put('/registration')
        .send({
          userId,
          username: 'User 1',
        })
        .expect(404);
    });

    it(`User '${users[1].username}' already exists`, () => {
      return request(app.getHttpServer())
        .put('/registration')
        .send({
          ...users[0],
          username: 'User 1',
        })
        .expect(403);
    });
  });

  describe('DELETE', () => {
    it('Success', done => {
      users.forEach(user => {
        request(app.getHttpServer())
          .delete('/registration')
          .send({ userId: user.userId })
          .expect(200)
          .expect(res => {
            expect(res.text === '').toBeTruthy();
          })
          .end(done);
      });
    });

    it('User not found', () => {
      return request(app.getHttpServer())
        .delete('/registration')
        .send({ userId })
        .expect(404);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
