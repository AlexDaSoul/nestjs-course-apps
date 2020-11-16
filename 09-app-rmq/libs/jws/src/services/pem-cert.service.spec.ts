import { Test, TestingModule } from '@nestjs/testing';
import { JwsService } from './jws.service';
import { PemCertService } from './pem-cert.service';

describe('PemCertService', () => {
  let service: PemCertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PemCertService, JwsService],
    }).compile();

    service = module.get<PemCertService>(PemCertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createToken', async () => {
    jest.spyOn(service, 'createCertificate');
    const keys = await service.createCertificate();

    expect(keys['JWT_PUB'].length).toBeTruthy();
    expect(keys['JWT_PUB'].length).toBeTruthy();
  });
});
