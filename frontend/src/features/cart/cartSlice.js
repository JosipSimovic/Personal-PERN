import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: (state, action) => {
      state = [];
    },
    addProductToCart: (state, action) => {
      const existingItem = state.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItem) {
        existingItem.amount += action.payload.amount; // Update the amount
      } else {
        state.push(action.payload);
      }
    },
    setCartProductAmount: (state, action) => {
      const existingItem = state.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        if (action.payload.type === "plus") {
          existingItem.amount += 1;
        } else if (action.payload.type === "minus") {
          existingItem.amount -= 1;
        }
      }
    },
  },
});

export const { addProductToCart, emptyCart, setCartProductAmount } =
  cartSlice.actions;

export default cartSlice.reducer;
