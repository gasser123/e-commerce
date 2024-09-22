import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class PaypalConfigService {
  constructor(private configService: ConfigService) {}

  getClientId() {
    const clientId = this.configService.getOrThrow<string>("PAYPAL_CLIENT_ID");
    return {
      clientId,
    };
  }
}
