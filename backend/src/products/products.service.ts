import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
@Injectable()
export class ProductsService {
  repo: Repository<Product>;
  constructor(@InjectRepository(Product) repo: Repository<Product>) {
    this.repo = repo;
  }
}
