import { apiSlice } from "./apiSlice";
import { Product } from "../../schemas/Product.schema";
import { ProductJoins } from "../../schemas/ProductJoins.schema";
import { GetProductsDto } from "../../schemas/GetProductsDto.schema";
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // operations done on endpoints
    // query for GET request while mutation is for other http methods
    // you should supply generics for the return type and the expected query argument: build.query<ReturnType, ArgType>.
    // If there is no argument, use void for the arg type instead
    getProducts: builder.query<GetProductsDto, number>({
      query: (page) => ({
        url: "/products",
        params: {
          page,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getProduct: builder.query<ProductJoins, number>({
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
    updateProduct: builder.mutation<Product, FormData>({
      query: (data) => ({
        url: `/products/${data.get("id")}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<Product, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
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
  useDeleteProductMutation,
} = productsApiSlice;
