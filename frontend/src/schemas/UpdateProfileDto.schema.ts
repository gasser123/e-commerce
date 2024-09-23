import z from "zod";
export const UpdateProfileDtoSchema = z.object({
  name: z.string().trim().min(1, "name should not be empty"),

  email: z.string().email(),

  password: z.optional(z.string()),
});

export type UpdateProfileDto = z.infer<typeof UpdateProfileDtoSchema>;
