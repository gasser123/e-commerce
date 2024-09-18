import { Test, TestingModule } from '@nestjs/testing';
import { ManageOrderService } from './manage-order.service';

describe('ManageOrderService', () => {
  let service: ManageOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageOrderService],
    }).compile();

    service = module.get<ManageOrderService>(ManageOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
