import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class ShippingAddressDto {
  @IsNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (typeof value === "string" ? value.trim() : value),
    { toClassOnly: true },
  )
  address: string;

  @IsNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (typeof value === "string" ? value.trim() : value),
    { toClassOnly: true },
  )
  city: string;

  @IsNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (typeof value === "string" ? value.trim() : value),
    { toClassOnly: true },
  )
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (typeof value === "string" ? value.trim() : value),
    { toClassOnly: true },
  )
  country: string;
}
