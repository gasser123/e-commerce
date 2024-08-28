import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UnprocessableEntityException,
} from "@nestjs/common";
import products from "./products";
@Controller("products")
export class ProductsController {
  @Get()
  getProducts() {
    return products;
  }

  @Get("/:id")
  getProduct(@Param("id") id: string) {
    const product = products.find((p) => p.id === parseInt(id));
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    return product;
  }
}
