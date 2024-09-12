import z from "zod";
export const LoginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "password should not be empty"),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;
