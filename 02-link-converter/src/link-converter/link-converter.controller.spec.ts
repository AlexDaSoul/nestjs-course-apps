import { Test, TestingModule } from '@nestjs/testing';
import { LinkConverterController } from './link-converter.controller';

describe('LinkConverterController', () => {
  let controller: LinkConverterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkConverterController],
    }).compile();

    controller = module.get<LinkConverterController>(LinkConverterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
