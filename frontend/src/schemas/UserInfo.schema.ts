import z from "zod";
export const UserInfoSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    name: z.string(),
    isAdmin: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
})

export type UserInfo = z.infer<typeof UserInfoSchema>;