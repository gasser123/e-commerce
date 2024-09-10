import z from "zod";
import { ProductSchema } from "./Product.schema";
import { OrderSchema } from "./Order.schema";
export const OrderItemSchema = z.object({
  id: z.number(),
  qty: z.number(),
  order: OrderSchema,
  product: ProductSchema,
});

export type OrderItem = z.infer<typeof OrderItemSchema>;
