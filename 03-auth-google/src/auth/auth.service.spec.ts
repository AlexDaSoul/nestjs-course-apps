import { NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './passport/google.strategy';
import { SessionSerializer } from './passport/session.serializer';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const user = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, GoogleStrategy, SessionSerializer],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('googleLogin', () => {
    it('Success googleLogin', () => {
      jest.spyOn(service, 'googleLogin');
      expect(service.googleLogin({ user } as Request)).toEqual({
        message: 'User information from google',
        user,
      });
    });

    it('Credentions fail googleLogin', () => {
      jest.spyOn(service, 'googleLogin');
      expect(async () =>
        service.googleLogin({ user: undefined } as Request),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
