import z from "zod";
export const UserInfoSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    name: z.string(),
    isAdmin: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type UserInfo = z.infer<typeof UserInfoSchema>;