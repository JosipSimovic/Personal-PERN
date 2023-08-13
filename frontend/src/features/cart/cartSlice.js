import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: (state, action) => {
      state = [];
    },
    addProduct: (state, action) => {
      const existingItem = state.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItem) {
        existingItem.amount += action.payload.amount; // Update the amount
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { addProduct, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
