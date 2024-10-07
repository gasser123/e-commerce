import { Expose, Type } from "class-transformer";
import { ProductReviewDto } from "./ProductReview.dto";
export class ProductDetailsDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  image: string;

  @Expose()
  brand: string;

  @Expose()
  category: string;

  @Expose()
  description: string;

  @Expose()
  rating: number;

  @Expose()
  numReviews: number;

  @Expose()
  price: number;
  @Expose()
  countInStock: number;

  @Expose()
  @Type(() => ProductReviewDto)
  reviews: ProductReviewDto[];

  @Expose()
  createdAt: Date | string;

  @Expose()
  updatedAt: Date | string;

  constructor(productDetailsInfo: ProductDetailsDto) {
    Object.assign(this, productDetailsInfo);
    this.reviews = this.reviews.map((review) => new ProductReviewDto(review));
  }
}
