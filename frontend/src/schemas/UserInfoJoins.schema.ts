import z from "zod";
import { ProductSchema } from "./Product.schema";
import { ReviewSchema } from "./Review.schema";
import { UserInfoSchema } from "./UserInfo.schema";
import { OrderSchema } from "./Order.schema";
export const UserJoinSchema = UserInfoSchema.extend({
  products: z.optional(z.array(ProductSchema)),
  reviews: z.optional(z.array(ReviewSchema)),
  orders: z.optional(z.array(OrderSchema)),
});

export type UserJoin = z.infer<typeof UserJoinSchema>;
