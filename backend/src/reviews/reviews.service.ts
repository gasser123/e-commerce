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
}
