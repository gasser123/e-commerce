import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (typeof value === "string" ? value.trim() : value),
    { toClassOnly: true },
  )
  comment: string;

  @IsNumber()
  productId: number;
}
