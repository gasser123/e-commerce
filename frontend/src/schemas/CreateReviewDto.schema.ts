import z from "zod";
export const CreateReviewDtoSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5, "Max rating is 5"),
  comment: z.string().trim().min(1, "comment field is empty"),
  productId: z.number(),
});

export type CreateReviewDto = z.infer<typeof CreateReviewDtoSchema>;
