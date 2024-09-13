import z from "zod";
export const ShippingAddressInputSchema = z.object({
  address: z.string().trim().min(1, "address should not be empty"),
  city: z.string().trim().min(1, "city should not be empty"),
  postalCode: z.string().trim().min(1, "postal code should not be empty"),
  country: z.string().trim().min(1, "country should not be empty"),
});

export type ShippingAddressInput = z.infer<typeof ShippingAddressInputSchema>;
