import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.productList = action.payload;
    },
  },
});

export const { fetchProducts } = productsSlice.actions;

export default productsSlice.reducer;
