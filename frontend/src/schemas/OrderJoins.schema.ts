import z from "zod";
import { OrderSchema } from "./Order.schema";
import { OrderItemSchema } from "./OrderItem.schema";
import { UserInfoSchema } from "./UserInfo.schema";
export const OrderJoinsSchema = OrderSchema.extend({
  orderItems: z.optional(z.array(OrderItemSchema)),
  user: z.optional(UserInfoSchema),
});

export type OrderJoins = z.infer<typeof OrderJoinsSchema>;
