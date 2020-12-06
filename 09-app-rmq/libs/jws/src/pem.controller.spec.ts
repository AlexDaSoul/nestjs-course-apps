import { Test, TestingModule } from '@nestjs/testing';
import { PemController } from './pem.controller';

describe('PemController', () => {
  let controller: PemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PemController],
    }).compile();

    controller = module.get<PemController>(PemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
