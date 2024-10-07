// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../config";
// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  // base URL for fetching
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  // used for caching
  tagTypes: ["Product", "User", "Order", "Review"],
  
  endpoints: () => ({}),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
// export const {Get} = apiSlice;
