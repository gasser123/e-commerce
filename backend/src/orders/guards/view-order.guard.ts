import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { CustomRequest } from "src/interfaces/custom-request.interface";
import { OrdersService } from "../orders.service";

@Injectable()
export class ViewOrderGuard implements CanActivate {
  constructor(private ordersService: OrdersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const orderId = parseInt(request.params.id);
    const orderOwner = await this.ordersService.findOrderUser({ id: orderId });
    if (request.currentUser) {
      if (request.currentUser.isAdmin) {
        return true;
      }

      if (orderOwner.id === request.currentUser.id) {
        return true;
      }
    }
    return false;
  }
}
