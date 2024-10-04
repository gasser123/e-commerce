import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AdminUpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (typeof value === "string" ? value.trim() : value),
    { toClassOnly: true },
  )
  name: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  isAdmin: boolean;
}
