import { Expose } from "class-transformer";

export class ProductReviewUserDto {
  @Expose()
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
