import { IsNumber, IsString } from "class-validator";

export class OrderItemDto {
  @IsNumber()
  qty: number;

  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString()
  brand: string;

  @IsString()
  category: string;

  @IsNumber()
  price: number;

  @IsNumber()
  countInStock: number;

  @IsNumber()
  rating: number;

  @IsNumber()
  numReviews: number;
}
