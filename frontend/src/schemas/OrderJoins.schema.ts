import z from "zod";
import { OrderSchema } from "./Order.schema";
import { OrderItemSchema } from "./OrderItem.schema";
export const OrderJoinsSchema = OrderSchema.extend({
  orderItems: z.array(OrderItemSchema),
});

export type OrderJoins = z.infer<typeof OrderJoinsSchema>;
