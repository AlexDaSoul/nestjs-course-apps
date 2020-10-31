import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { JwtStrategy } from '../passport/jwt.strategy';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const creds = {
    username: 'john',
    password: 'changeme',
  };
  const user = {
    ...creds,
    userId: 1,
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

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('Successfully findOne', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(user));
      expect(service.findOne(creds.username)).resolves.toBe(user);
    });

    it('Credentions fail findOne', async () => {
      jest.spyOn(service, 'findOne');
      expect(service.findOne('blabla')).resolves.toBeUndefined();
    });
  });
});
