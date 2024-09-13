import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartSchema } from "../../schemas/Cart.schema";
import { addDecimal } from "../../util/util-functions";
import { CartItem } from "../../schemas/CartItem.schema";
import ShippingAddress from "../../interfaces/ShippingAddress";
// Define a type for the slice state

// Define the initial state using that type
const storedCart = localStorage.getItem("cart");
const cart = storedCart ? JSON.parse(storedCart) : null;
const validateCart = CartSchema.safeParse(cart).success;
const initialState: Cart = validateCart
  ? cart
  : {
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
      shippingAddress: {
        address: "",
        city: "",
        country: "",
        postalCode: "",
      },

      paymentMethod: "PayPal",
    };

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
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
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      // Calculate shipping price (free for orders over $100 else $10 shipping)
      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
      // Calculate tax price (15% tax)
      state.taxPrice = addDecimal(state.itemsPrice * 0.15);
      // Calculate total price
      state.totalPrice =
        state.itemsPrice + state.shippingPrice + state.taxPrice;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== id
      );
      // Calculate items price
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      // Calculate shipping price (free for orders over $100 else $10 shipping)
      state.shippingPrice = addDecimal(
        state.itemsPrice > 100 || state.cartItems.length === 0 ? 0 : 10
      );
      // Calculate tax price (15% tax)
      state.taxPrice = addDecimal(state.itemsPrice * 0.15);
      // Calculate total price
      state.totalPrice =
        state.itemsPrice + state.shippingPrice + state.taxPrice;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export default cartSlice;
