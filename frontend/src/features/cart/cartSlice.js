import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartState: (state, action) => {
      return action.payload;
    },
    emptyCart: () => {
      return initialState;
    },
    addProductToCart: (state, action) => {
      const existingItem = state.find(
        (item) => item.id === action.payload.product.id
      );
      if (existingItem) {
        existingItem.amount += action.payload.amount; // Update the amount
      } else {
        let productWithAmount = action.payload.product;
        productWithAmount.amount = action.payload.amount;
        state.push(action.payload.product);
      }
    },
    setCartProductAmount: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        if (action.payload.type === "plus") {
          existingItem.amount += action.payload.amount;
        } else if (action.payload.type === "minus") {
          existingItem.amount -= action.payload.amount;
        }
      }
    },
  },
});

export const {
  setCartState,
  addProductToCart,
  emptyCart,
  setCartProductAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
