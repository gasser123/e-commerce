import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts() {
    return this.productsService.findAll();
  }

  @Get("/:id")
  getProduct(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.findOneBy({ id });
  }
}
