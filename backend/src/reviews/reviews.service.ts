import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./review.entity";
import { Repository } from "typeorm";
@Injectable()
export class ReviewsService {
  repo: Repository<Review>;
  constructor(@InjectRepository(Review) repo: Repository<Review>) {
    this.repo = repo;
  }

  createReview(reviewInfo: Partial<Review>) {
    const review = this.repo.create(reviewInfo);
    return this.repo.save(review);
  }

  findUserReviewForProduct(userId: number, productId: number) {
    return this.repo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });
  }
}
