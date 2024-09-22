import { Module } from '@nestjs/common';
import { PaypalConfigService } from './paypal-config.service';
import { PaypalConfigController } from './paypal-config.controller';

@Module({
  providers: [PaypalConfigService],
  controllers: [PaypalConfigController]
})
export class PaypalConfigModule {}
