import z from "zod";
import { ProductSchema } from "./Product.schema";
import { UserInfoSchema } from "./UserInfo.schema";
export const ReviewSchema = z.object({
  id: z.number(),
  rating: z.number(),
  comment: z.string(),
  user: z.optional(UserInfoSchema),
  product: z.optional(ProductSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Review = z.infer<typeof ReviewSchema>;
