import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = Cookies.get("cart")
  ? { ...JSON.parse(Cookies.get("cart")), loading: true }
  : {
      cartItems: [],
      loading: true,
    };
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) => (x.id === existItem.id ? item : x));
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      if (state.itemPrice > 100 || state.itemPrice == 0) {
        state.shippingPrice = addDecimals(0);
      } else {
        state.shippingPrice = addDecimals(100);
      }

      state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));
      state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      Cookies.set("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload.id);
      state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      if (state.itemPrice > 100 || state.itemPrice == 0) {
        state.shippingPrice = addDecimals(0);
      } else {
        state.shippingPrice = addDecimals(100);
      }
      state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));
      state.totalPrice =
        Number(state.itemPrice) + Number(state.shippingPrice) + Number(state.taxPrice);

      Cookies.set("cart", JSON.stringify(state));
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { addToCart, removeFromCart, hideLoading } = cartSlice.actions;

export default cartSlice.reducer;
