import { CreateReviewDto } from "../../schemas/CreateReviewDto.schema";
import { Review } from "../../schemas/Review.schema";
import { apiSlice } from "./apiSlice";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<Review, CreateReviewDto>({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Review", "Product"],
    }),
  }),
});

export const { useCreateReviewMutation } = reviewsApiSlice;
