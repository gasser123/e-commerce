import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";
import { OrderItemDto } from "./orderItem.dto";
import { ShippingAddressDto } from "./ShippingAddress.dto";
import { Transform, Type } from "class-transformer";

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @IsNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (typeof value === "string" ? value.trim() : value),
    { toClassOnly: true },
  )
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
