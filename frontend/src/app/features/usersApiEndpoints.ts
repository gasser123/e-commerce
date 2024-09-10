import { apiSlice } from "./apiSlice";
import { UserInfo } from "../../schemas/UserInfo.schema";
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // operations done on endpoints
    // query for GET request while mutation is for other httsp methods
    // you should supply generics for the return type and the expected query argument: ex: build.query<ReturnType, ArgType>,
    // If there is no argument, use void for the arg type instead
    login: builder.mutation<UserInfo, void>({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
