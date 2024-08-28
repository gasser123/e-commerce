import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartSchema } from "../../schemas/Cart.schema";
import { addDecimal } from "../../util/util-functions";
// Define a type for the slice state

// Define the initial state using that type
const storedCart = localStorage.getItem("cart");
const cart = storedCart ? JSON.parse(storedCart) : null;
const validateCart = CartSchema.safeParse(cart).success;
const initialState: Cart = validateCart ? cart : { cartItems: [], itemsPrice: 0 };

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.id === existingItem.id ? item : cartItem
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate items price
      state.itemsPrice = addDecimal(state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      ));
      // Calculate shipping price (free for orders over $100 else $10 shipping)
       state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
      // Calculate tax price (15% tax)
      state.taxPrice = addDecimal(state.itemsPrice * 0.15);
      // Calculate total price
      state.totalPrice = state.itemsPrice + state.shippingPrice +  state.taxPrice;
      localStorage.setItem("cart", JSON.stringify(state)); 
    },
    
  },
});

export default cartSlice;