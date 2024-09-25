import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { AdminGuard } from "src/auth/guards/admin.guard";
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

  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  createProduct() {
    return "create Product";
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch("/:id")
  updateProduct(@Param("id", ParseIntPipe) id: number) {
    return "update Product " + id;
  }
}
