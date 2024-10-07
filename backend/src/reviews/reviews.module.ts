import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./review.entity";
import { ReviewsController } from "./reviews.controller";
import { AuthModule } from "src/auth/auth.module";
import { ProductsModule } from "src/products/products.module";
@Module({
  providers: [ReviewsService],
  imports: [TypeOrmModule.forFeature([Review]), AuthModule, ProductsModule],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
