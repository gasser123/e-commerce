import { Expose, Type } from "class-transformer";
import { ProductReviewUserDto } from "./ProductReviewUser.dto";

export class ProductReviewDto {
  @Expose()
  id: number;

  @Expose()
  rating: number;

  @Expose()
  comment: string;

  @Expose()
  @Type(() => ProductReviewUserDto)
  user: ProductReviewUserDto;

  @Expose()
  createdAt: Date | string;

  @Expose()
  updatedAt: Date | string;
  constructor(productReviewInfo: ProductReviewDto) {
    Object.assign(this, productReviewInfo);
    this.user = new ProductReviewUserDto(this.user.name);
  }
}
