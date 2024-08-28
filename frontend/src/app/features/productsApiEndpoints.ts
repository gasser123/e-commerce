import { apiSlice } from "./apiSlice";
import Product from "../../interfaces/product.interface";
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // operations done on endpoints
    // query for GET request while mutation is for other httsp methods
    // you should supply generics for the return type and the expected query argument: build.query<ReturnType, ArgType>.
    // If there is no argument, use void for the arg type instead
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: "/products",
      }),
      keepUnusedDataFor: 5,
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => ({ url: `/products/${id}` }),

      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApiSlice;
