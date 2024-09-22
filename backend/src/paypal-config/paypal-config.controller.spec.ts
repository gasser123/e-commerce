import { Test, TestingModule } from '@nestjs/testing';
import { PaypalConfigController } from './paypal-config.controller';

describe('PaypalConfigController', () => {
  let controller: PaypalConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaypalConfigController],
    }).compile();

    controller = module.get<PaypalConfigController>(PaypalConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
