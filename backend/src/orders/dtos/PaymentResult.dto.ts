import { IsEmail, IsNumber, IsString } from "class-validator";

export class PaymentResultDto {
  @IsNumber()
  id: number;

  @IsString()
  status: string;

  @IsString()
  update_time: string;

  @IsEmail()
  email_address: string;
}
