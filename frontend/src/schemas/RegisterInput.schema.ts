import z from "zod";
export const RegisterInputSchema = z
  .object({
    name: z.string().min(1, "name should not be empty"),
    email: z.string().email(),
    password: z.string().min(1, "password should not be empty"),
    confirmPassword: z.string().min(1, "confirm password should not be empty"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

export type RegisterInput = z.infer<typeof RegisterInputSchema>;
export type RegisterDto = Omit<RegisterInput, "confirmPassword">; 
