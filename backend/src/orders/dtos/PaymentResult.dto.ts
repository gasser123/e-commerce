import { IsNumber, IsString, ValidateNested } from "class-validator";
import { PayerDto } from "./payer.dto";
import { Type } from "class-transformer";

export class PaymentResultDto {
  @IsNumber()
  id: number;

  @IsString()
  status: string;

  @IsString()
  update_time: string;
  @ValidateNested()
  @Type(() => PayerDto)
  payer: PayerDto;
}
