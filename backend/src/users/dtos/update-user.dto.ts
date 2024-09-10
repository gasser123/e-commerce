import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;
}
