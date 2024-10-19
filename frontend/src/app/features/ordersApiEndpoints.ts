import { apiSlice } from "./apiSlice";
import { Order } from "../../schemas/Order.schema";
import { Cart } from "../../schemas/Cart.schema";
import { OrderJoins } from "../../schemas/OrderJoins.schema";
import { PaymentResultDto } from "../../schemas/PaymentResult.dto.schema";
import { GetOrdersDto } from "../../schemas/GetOrdersDto.shcema";
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, Cart>({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
    getMyOrders: builder.query<Order[], void>({
      query: () => ({ url: "/orders/myorders", credentials: "include" }),
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    }),
    getOrderDetails: builder.query<OrderJoins, number>({
      query: (id) => ({ url: `/orders/${id}`, credentials: "include" }),
      providesTags: (_result, _error, arg) => [{ type: "Order", id: arg }],
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation<Order, { id: number; data: PaymentResultDto }>({
      query: ({ id, data }) => ({
        url: `/orders/${id}/pay`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
    getPayPalClientId: builder.query<{ clientId: string }, void>({
      query: () => ({ url: "/paypal-config" }),
    }),
    getAllOrders: builder.query<
      GetOrdersDto,
      { page: number; search?: string }
    >({
      query: ({ page, search }) => ({
        url: "/orders",
        params: {
          page,
          search,
        },
        credentials: "include",
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    }),

    deliverOrder: builder.mutation<Order, number>({
      query: (id) => ({
        url: `/orders/${id}/deliver`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetAllOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;
