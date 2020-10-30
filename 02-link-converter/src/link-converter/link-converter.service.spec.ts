import { Test, TestingModule } from '@nestjs/testing';
import { LinkConverterService } from './link-converter.service';

describe('LinkConverterService', () => {
  let service: LinkConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkConverterService],
    }).compile();

    service = module.get<LinkConverterService>(LinkConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
