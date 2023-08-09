import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: (state, action) => {
      console.log("empty state");
      state = [];
      console.log(state);
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addProduct, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
