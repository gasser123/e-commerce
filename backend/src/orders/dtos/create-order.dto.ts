import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { CartItemDto } from "./cartItem.dto";
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

  @Min(0)
  @IsNumber()
  itemsPrice: number;

  @Min(0)
  @IsNumber()
  taxPrice: number;

  @Min(0)
  @IsNumber()
  shippingPrice: number;

  @Min(0)
  @IsNumber()
  totalPrice: number;

  @ValidateNested({ each: true })
  @IsObject({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @Type(() => CartItemDto)
  cartItems: CartItemDto[];
}
