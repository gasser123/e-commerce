import { IsEmail } from "class-validator";

export class PayerDto{
  @IsEmail()
  email_address: string;
}
