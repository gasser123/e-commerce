import z from "zod";
import { UserInfoSchema } from "./UserInfo.schema";
export const OrderSchema = z.object({
  id: z.number(),
  shippingAddress: z.object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  paymentMethod: z.string(),
  paymentResult: z.object({
    id: z.number(),
    status: z.string(),
    update_time: z.string(),
    email_address: z.string(),
  }),
  itemsPrice: z.number(),
  taxPrice: z.number(),
  shippingPrice: z.number(),
  totalPrice: z.number(),
  isPaid: z.boolean(),
  paidAt: z.date(),
  isDelivered: z.boolean(),
  deliveredAt: z.date(),
  user: UserInfoSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Order = z.infer<typeof OrderSchema>;
