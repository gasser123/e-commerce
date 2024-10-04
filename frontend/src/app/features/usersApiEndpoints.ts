import { apiSlice } from "./apiSlice";
import { UserInfo } from "../../schemas/UserInfo.schema";
import { LoginInput } from "../../schemas/LoginInput.schema";
import { RegisterDto } from "../../schemas/RegisterInput.schema";
import { UpdateProfileDto } from "../../schemas/UpdateProfileDto.schema";
import { AdminUpdateUserDto } from "../../schemas/AdminUpdateUserDto.schema";
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // operations done on endpoints
    // query for GET request while mutation is for other http methods
    // you should supply generics for the return type and the expected query argument: ex: build.query<ReturnType, ArgType>,
    // If there is no argument, use void for the arg type instead
    login: builder.mutation<UserInfo, LoginInput>({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    register: builder.mutation<UserInfo, RegisterDto>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    updateProfile: builder.mutation<UserInfo, UpdateProfileDto>({
      query: (data) => ({
        url: "/users/profile",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query<UserInfo[], void>({
      query: () => ({
        url: "/users",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["User"],
    }),

    getUser: builder.query<UserInfo, number>({
      query: (id) => ({ url: `/users/${id}`, credentials: "include" }),

      keepUnusedDataFor: 5,
      providesTags: (_result, _error, arg) => [{ type: "User", id: arg }],
    }),
    deleteUser: builder.mutation<UserInfo, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<UserInfo, AdminUpdateUserDto>({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApiSlice;
