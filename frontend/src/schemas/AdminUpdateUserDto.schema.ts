import z from "zod";
export const AdminUpdateUserDtoSchema = z.object({
  id: z.number(),
  name: z.string().trim().min(1, "name should not be empty"),

  email: z.string().email(),

  isAdmin: z.boolean(),
});

export type AdminUpdateUserDto = z.infer<typeof AdminUpdateUserDtoSchema>;
