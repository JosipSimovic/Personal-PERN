import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../features/webshop/filtersSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cart: cartReducer,
  },
});
