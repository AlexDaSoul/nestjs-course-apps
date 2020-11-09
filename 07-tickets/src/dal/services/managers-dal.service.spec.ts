import { Test, TestingModule } from '@nestjs/testing';
import { ManagersDalService } from './managers-dal.service';

describe('ManagersDalService', () => {
  let service: ManagersDalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagersDalService],
    }).compile();

    service = module.get<ManagersDalService>(ManagersDalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
