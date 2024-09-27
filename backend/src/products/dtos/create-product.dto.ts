import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (typeof value === "string" ? value.trim() : value),
    { toClassOnly: true },
  )
  name: string;

  @IsNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (typeof value === "string" ? value.trim() : value),
    { toClassOnly: true },
  )
  brand: string;

  @IsNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (typeof value === "string" ? value.trim() : value),
    { toClassOnly: true },
  )
  category: string;

  @IsNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (typeof value === "string" ? value.trim() : value),
    { toClassOnly: true },
  )
  description: string;

  @Min(0)
  @IsNumber()
  @Transform(
    ({ value }) =>
      typeof value === "string"
        ? Number(parseFloat(value.trim()).toFixed(2))
        : value,
    { toClassOnly: true },
  )
  price: number;

  @Min(0)
  @IsNumber()
  @Transform(
    ({ value }) => (typeof value === "string" ? parseInt(value.trim()) : value),
    { toClassOnly: true },
  )
  countInStock: number;
}
