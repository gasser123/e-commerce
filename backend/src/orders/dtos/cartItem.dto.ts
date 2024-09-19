import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CartItemDto {
  @IsPositive()
  @IsNumber()
  qty: number;

  // this is product id
  @IsNumber()
  id: number;

  // @IsNotEmpty()
  // @IsString()
  // @Transform(
  //   ({ value }) => (typeof value === "string" ? value.trim() : value),
  //   { toClassOnly: true },
  // )
  // name: string;

  // @IsNotEmpty()
  // @IsString()
  // @Transform(
  //   ({ value }) => (typeof value === "string" ? value.trim() : value),
  //   { toClassOnly: true },
  // )
  // image: string;

  // @IsNotEmpty()
  // @IsString()
  // @Transform(
  //   ({ value }) => (typeof value === "string" ? value.trim() : value),
  //   { toClassOnly: true },
  // )
  // description: string;

  // @IsNotEmpty()
  // @IsString()
  // @Transform(
  //   ({ value }) => (typeof value === "string" ? value.trim() : value),
  //   { toClassOnly: true },
  // )
  // brand: string;

  // @IsNotEmpty()
  // @IsString()
  // @Transform(
  //   ({ value }) => (typeof value === "string" ? value.trim() : value),
  //   { toClassOnly: true },
  // )
  // category: string;

  // @IsNumber()
  // price: number;

  // @IsNumber()
  // countInStock: number;

  // @IsNumber()
  // rating: number;

  // @IsNumber()
  // numReviews: number;
}
