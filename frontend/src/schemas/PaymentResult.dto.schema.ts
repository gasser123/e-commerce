import z from "zod";
export const PaymentResultDtoSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
  update_time: z.string().optional(),
  payer: z.object({
    email_address: z.string().email().optional(),
  }),
});

export type PaymentResultDto = z.infer<typeof PaymentResultDtoSchema>;
