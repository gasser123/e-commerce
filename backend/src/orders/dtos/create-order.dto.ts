import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";
import { OrderItemDto } from "./orderItem.dto";
import { ShippingAddressDto } from "./ShippingAddress.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @IsString()
  paymentMethod: string;

  @IsNumber()
  itemsPrice: number;

  @IsNumber()
  taxPrice: number;

  @IsNumber()
  shippingPrice: number;

  @IsNumber()
  totalPrice: number;

  @ValidateNested({ each: true })
  @IsObject({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}
