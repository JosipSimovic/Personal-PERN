import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../features/webshop/filtersSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
});