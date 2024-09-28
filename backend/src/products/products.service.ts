import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { removeImage } from "src/util/removeImage";
@Injectable()
export class ProductsService {
  repo: Repository<Product>;
  constructor(@InjectRepository(Product) repo: Repository<Product>) {
    this.repo = repo;
  }

  findAll(): Promise<Product[]> {
    return this.repo.find();
  }

  findOneBy(productInfo: Partial<Product>): Promise<Product | null> {
    return this.repo.findOneBy(productInfo);
  }

  createProduct(productInfo: Partial<Product>) {
    const product = this.repo.create(productInfo);
    return this.repo.save(product);
  }

  async updateProduct(id: number, productInfo: Partial<Product>) {
    const product = await this.repo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException("product not found");
    }

    if (productInfo.image) {
      const arr = product.image.split("uploads");
      const imagePath = "uploads" + arr[arr.length - 1];
      await removeImage(imagePath);
    }

    Object.assign(product, productInfo);
    return this.repo.save(product);
  }
}
