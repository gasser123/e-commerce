import { Order } from "../order.entity";

export class GetOrdersDto {
  orders: Order[];
  page: number;
  pages: number;
  constructor(getOrdersInfo: Partial<GetOrdersDto>) {
    Object.assign(this, getOrdersInfo);
  }
}
