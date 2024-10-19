import z from "zod";
import { OrderJoinsSchema } from "./OrderJoins.schema";
export const GetOrdersDtoSchema = z.object({
  orders: z.array(OrderJoinsSchema),
  page: z.number(),
  pages: z.number(),
});

export type GetOrdersDto = z.infer<typeof GetOrdersDtoSchema>;
