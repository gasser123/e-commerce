import z from "zod";
import { UserInfoSchema } from "./UserInfo.schema";
export const GetUsersDtoSchema = z.object({
  users: z.array(UserInfoSchema),
  page: z.number(),
  pages: z.number(),
});

export type GetUsersDto = z.infer<typeof GetUsersDtoSchema>;
