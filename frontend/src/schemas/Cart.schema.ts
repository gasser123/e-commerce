import z from "zod";
import { CartItemSchema } from "./CartItem.schema";
export const CartSchema = z.object({
  cartItems: z.array(CartItemSchema),
  itemsPrice: z.number(),
  shippingPrice: z.number(),
  taxPrice: z.number(),
  totalPrice: z.number(),
  shippingAddress: z.object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  paymentMethod: z.string(),
});
export type Cart = z.infer<typeof CartSchema>;
