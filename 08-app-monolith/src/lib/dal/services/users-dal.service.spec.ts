import { Test, TestingModule } from '@nestjs/testing';
import { UsersDalService } from './users-dal.service';

describe('UsersDalService', () => {
  let service: UsersDalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersDalService],
    }).compile();

    service = module.get<UsersDalService>(UsersDalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
