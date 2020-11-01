import { NotFoundException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { JwtStrategy } from '../passport/jwt.strategy';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

describe('AuthService', () => {
  let service: AuthService;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiY2hyaXMiLCJwYXNzd29yZCI6InNlY3JldCIsImlhdCI6MTYwNDE0MzcxOX0.v2Lg9tPtWflO5yki5MgiqRuMuUJPDK8Ve73GK2kmARI';
  const creds = {
    username: 'john',
    password: 'changeme',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRES },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('Success login', async () => {
      jest
        .spyOn(service, 'login')
        .mockImplementation(() => Promise.resolve(token));
      expect(service.login(creds)).resolves.toBe(token);
    });

    it('Credentions fail login', async () => {
      jest.spyOn(service, 'login');
      expect(
        service.login({ ...creds, username: 'blabla' }),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
