import { Controller, Get } from "@nestjs/common";
import { PaypalConfigService } from "./paypal-config.service";

@Controller("paypal-config")
export class PaypalConfigController {
  constructor(private paypalConfigService: PaypalConfigService) {}

  @Get()
  getClientId() {
    return this.paypalConfigService.getClientId();
  }
}
