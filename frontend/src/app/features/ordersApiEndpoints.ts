import { apiSlice } from "./apiSlice";
import { Order } from "../../schemas/Order.schema";
import { Cart } from "../../schemas/Cart.schema";
import { OrderJoins } from "../../schemas/OrderJoins.schema";
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, Cart>({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getMyOrders: builder.query<Order[], void>({
      query: () => ({ url: "/orders/myorders", credentials: "include" }),

      keepUnusedDataFor: 5,
    }),
    getOrderDetails: builder.query<OrderJoins, number>({
      query: (id) => ({ url: `/orders/${id}`, credentials: "include" }),

      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery, useGetOrderDetailsQuery } = ordersApiSlice;
