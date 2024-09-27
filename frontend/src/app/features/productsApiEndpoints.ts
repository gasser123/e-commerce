import { apiSlice } from "./apiSlice";
import { Product } from "../../schemas/Product.schema";
import { UpdateProductDto } from "../../schemas/UpdateProductDto.schema";
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // operations done on endpoints
    // query for GET request while mutation is for other http methods
    // you should supply generics for the return type and the expected query argument: build.query<ReturnType, ArgType>.
    // If there is no argument, use void for the arg type instead
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: "/products",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => ({ url: `/products/${id}` }),

      keepUnusedDataFor: 5,
      providesTags: (_result, _error, arg) => [{ type: "Product", id: arg }],
    }),

    createProduct: builder.mutation<Product, FormData>({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<Product, UpdateProductDto>({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApiSlice;
