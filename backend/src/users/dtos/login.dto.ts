import { Transform } from "class-transformer";
import { IsEmail, IsString, IsNotEmpty } from "class-validator";
export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (typeof value === "string" ? value.trim() : value),
    { toClassOnly: true },
  )
  password: string;
}
