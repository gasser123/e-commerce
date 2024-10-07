import z from "zod";
import { ProductSchema } from "./Product.schema";
import { UserInfoSchema } from "./UserInfo.schema";
import { OrderItemSchema } from "./OrderItem.schema";
import { ReviewSchema } from "./Review.schema";
export const ProductJoinsSchema = ProductSchema.extend({
  orderItems: z.optional(z.array(OrderItemSchema)),
  reviews: z.optional(z.array(ReviewSchema)),
  user: z.optional(UserInfoSchema),
});

export type ProductJoins = z.infer<typeof ProductJoinsSchema>;
