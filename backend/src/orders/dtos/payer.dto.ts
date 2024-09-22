import { IsEmail, IsOptional } from "class-validator";

export class PayerDto{
  @IsOptional()
  @IsEmail()
  email_address: string;
}
