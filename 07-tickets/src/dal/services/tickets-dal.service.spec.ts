import { Test, TestingModule } from '@nestjs/testing';
import { TicketsDalService } from './tickets-dal.service';

describe('TicketsDalService', () => {
  let service: TicketsDalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsDalService],
    }).compile();

    service = module.get<TicketsDalService>(TicketsDalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
