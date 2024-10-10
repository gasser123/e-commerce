import { Product } from "../product.entity";

export class GetProductsDto {
  products: Product[];
  page: number;
  pages: number;
  constructor(getProductsInfo: Partial<GetProductsDto>) {
    Object.assign(this, getProductsInfo);
  }
}
