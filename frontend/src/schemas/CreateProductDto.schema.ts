import z from "zod";
export const CreateProductDtoSchema = z.object({
  name: z.string().trim().min(1, "name should not be empty"),
  brand: z.string().trim().min(1, "brand should not be empty"),
  category: z.string().trim().min(1, "category should not be empty"),
  description: z.string().trim().min(1, "description should not be empty"),
  price: z
    .number({ invalid_type_error: "enter price number" })
    .min(0, "price should be a positive number"),
  countInStock: z
    .number({ invalid_type_error: "enter count in stock number" })
    .min(0, "count in stock should be a positive number"),
});

export type CreateProductDto = z.infer<typeof CreateProductDtoSchema>;
