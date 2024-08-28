import z from "zod";
import { ProductSchema } from "./Product.schema";
export const CartItemSchema = ProductSchema.extend({
    qty: z.number()
})

export type CartItem = z.infer<typeof CartItemSchema>;