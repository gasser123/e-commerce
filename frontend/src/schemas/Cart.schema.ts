import z from "zod";
import { CartItemSchema } from "./CartItem.schema";
export const CartSchema = z.object({
  cartItems: z.array(CartItemSchema),
  itemsPrice: z.number(),
  shippingPrice: z.number(),
  taxPrice: z.number(),
  totalPrice: z.number()
});
export type Cart = z.infer<typeof CartSchema>;
