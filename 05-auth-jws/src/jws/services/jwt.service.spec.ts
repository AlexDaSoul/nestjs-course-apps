import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from './jwt.service';
import { PemCertService } from './pem-cert.service';

describe('JwtService', () => {
  let service: JwtService;
  let pemCertService: PemCertService;
  let token;

  const creds = {
    username: 'john',
    password: 'changeme',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PemCertService, JwtService],
    }).compile();

    pemCertService = module.get<PemCertService>(PemCertService);
    service = module.get<JwtService>(JwtService);

    const keys = await pemCertService.createCertificate();

    process.env.JWT_PUB = keys.JWT_PUB;
    process.env.JWT_PRIV = keys.JWT_PRIV;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createToken', () => {
    jest.spyOn(service, 'createToken');
    token = service.createToken(creds);
    expect(token.length).toBeTruthy();
  });

  describe('verifyToken', () => {
    it('Success', () => {
      jest.spyOn(service, 'verifyToken');
      expect(service.verifyToken(token)['username']).toContain(creds.username);
    });

    it('Error', () => {
      jest.spyOn(service, 'verifyToken');
      expect(async () => service.verifyToken(null)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
