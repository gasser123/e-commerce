import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { User } from "src/users/user.entity";
import { CreateReviewDto } from "./dtos/create-review.dto";
import { ReviewsService } from "./reviews.service";
import { ProductsService } from "src/products/products.service";

@Controller("reviews")
export class ReviewsController {
  constructor(
    private reviewsService: ReviewsService,
    private productsService: ProductsService,
  ) {}
  @Post()
  @UseGuards(AuthGuard)
  async createReview(@CurrentUser() user: User, @Body() body: CreateReviewDto) {
    const { productId, ...reviewInfo } = body;
    const product = await this.productsService.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    const existingReview = await this.reviewsService.findUserReviewForProduct(
      user.id,
      product.id,
    );
    if (existingReview) {
      throw new BadRequestException("Product already reviewed");
    }
    const review = await this.reviewsService.createReview({
      ...reviewInfo,
      product,
      user,
    });
    await this.productsService.updateProductForReview(product.id);
    return { message: "Review added successfully" };
  }
}
