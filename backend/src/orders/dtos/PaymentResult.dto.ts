import { IsString, ValidateNested } from "class-validator";
import { PayerDto } from "./payer.dto";
import { Type } from "class-transformer";

export class PaymentResultDto {
  @IsString()
  id: string;

  @IsString()
  status: string;

  @IsString()
  update_time: string;
  @ValidateNested()
  @Type(() => PayerDto)
  payer: PayerDto;
}
