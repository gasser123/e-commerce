import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import products from "./products";
@Controller("products")
export class ProductsController {
  @Get()
  getProducts() {
    return products;
  }

  @Get("/:id")
  getProduct(@Param("id", ParseIntPipe) id: number) {
    const product = products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    return product;
  }
}
