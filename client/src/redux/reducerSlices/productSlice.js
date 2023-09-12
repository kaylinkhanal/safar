import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  wishList: [],
  cartList: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addWishList: (state, actions) => {
      debugger;
      const existingWishList = [...state.wishList]
      existingWishList.push(actions.payload)
      state.wishList =existingWishList
    },
   
  }
});

export const { addWishList } = productSlice.actions;
export default productSlice.reducer;
