import z from "zod";
export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    description: z.string(),
    brand: z.string(),
    category: z.string(),
    price: z.number(),
    countInStock: z.number(),
    rating: z.number(),
    numReviews: z.number()
})

export type Product = z.infer<typeof ProductSchema>;