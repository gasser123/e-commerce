import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { removeImage } from "src/util/removeImage";
import { OrderItemsService } from "src/order-items/order-items.service";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class ProductsService {
  repo: Repository<Product>;
  constructor(
    @InjectRepository(Product) repo: Repository<Product>,
    private orderItemsService: OrderItemsService,
    private configService: ConfigService,
  ) {
    this.repo = repo;
  }

  findAndCount(pageSize: number, pageNumber: number) {
    return this.repo.findAndCount({
      order: {
        createdAt: "DESC",
      },
      take: pageSize,
      skip: pageSize * (pageNumber - 1),
    });
  }

  findOneByWithReviewsJoinUser(
    productInfo: Partial<Product>,
  ): Promise<Product | null> {
    return this.repo.findOne({
      where: productInfo,
      relations: {
        reviews: {
          user: true,
        },
      },
    });
  }

  findOneBy(productInfo: Partial<Product>): Promise<Product | null> {
    return this.repo.findOneBy(productInfo);
  }

  findOneByWithReviews(productInfo: Partial<Product>): Promise<Product | null> {
    return this.repo.findOne({
      where: productInfo,
      relations: {
        reviews: true,
      },
    });
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

  async removeProduct(id: number) {
    const product = await this.repo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException("product not found");
    }

    const orderItems = await this.orderItemsService.findWithProduct(product.id);
    if (orderItems.length > 0) {
      throw new BadRequestException(
        "can't delete product referenced in an order",
      );
    }
    const SERVER_URL = this.configService.getOrThrow<string>("SERVER_URL");
    if (product.image.startsWith(`${SERVER_URL}/uploads`)) {
      const arr = product.image.split("uploads");
      const imagePath = "uploads" + arr[arr.length - 1];
      await removeImage(imagePath);
    }

    return this.repo.remove(product);
  }

  async updateProductForReview(productId: number) {
    const product = await this.findOneByWithReviews({ id: productId });
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    return this.repo.save(product);
  }
}
