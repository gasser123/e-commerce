import { Test, TestingModule } from '@nestjs/testing';
import { PaypalConfigService } from './paypal-config.service';

describe('PaypalConfigService', () => {
  let service: PaypalConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaypalConfigService],
    }).compile();

    service = module.get<PaypalConfigService>(PaypalConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
