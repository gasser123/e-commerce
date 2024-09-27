import z from "zod";
import { CreateProductDtoSchema } from "./CreateProductDto.schema";
export const UpdateProdutDtoSchema = CreateProductDtoSchema.extend({
  id: z.number(),
});

export type UpdateProductDto = z.infer<typeof UpdateProdutDtoSchema>;
