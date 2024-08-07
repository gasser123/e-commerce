import { Controller, Get, Param } from '@nestjs/common';
import products from './products';
@Controller('products')
export class ProductsController {
  @Get()
  getProducts() {
    return products;
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    const product = products.find((p) => p.id === parseInt(id));
    return product;
  }
}
