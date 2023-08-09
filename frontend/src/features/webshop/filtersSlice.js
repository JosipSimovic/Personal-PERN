import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  maxPrice: 0,
  sort: 0,
  numOfProducts: 20,
  price: [0, 0],
  colors: [],
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterName: (state, action) => {
      state.name = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setNumOfProducts: (state, action) => {
      state.numOfProducts = action.payload;
    },
    setFilterPrice: (state, action) => {
      state.price = action.payload;
    },
    setFilterColors: (state, action) => {
      state.colors = action.payload;
    },
  },
});

export const {
  setFilterName,
  setMaxPrice,
  setSort,
  setNumOfProducts,
  setFilterPrice,
  setFilterColors,
} = filtersSlice.actions;

export default filtersSlice.reducer;
