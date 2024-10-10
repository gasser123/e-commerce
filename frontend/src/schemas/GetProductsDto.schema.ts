import z from "zod";
import { ProductSchema } from "./Product.schema";
export const GetProductDtoSchema = z.object({
  products: z.array(ProductSchema),
  page: z.number(),
  pages: z.number(),
});

export type GetProductsDto = z.infer<typeof GetProductDtoSchema>;
