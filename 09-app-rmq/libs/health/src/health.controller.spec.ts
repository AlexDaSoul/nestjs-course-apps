import { Test, TestingModule } from '@nestjs/testing';
import { ProbesController } from './health.controller';

describe('ProbesController', () => {
  let controller: ProbesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProbesController],
    }).compile();

    controller = module.get<ProbesController>(ProbesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
