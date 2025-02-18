import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const getShopProduct = createAsyncThunk("/product/all", async () => {
  const result = await axios.get("http://localhost:7000/api/shop/product/all");
  return result?.data;
});

const shopProductSlice = createSlice({
  name: "shopProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShopProduct.pending,(state)=>{
        state.isLoading = true
    }).addCase(getShopProduct.fulfilled,(state,action)=>{
        // console.log("this is shop data",action.payload)
        state.isLoading = false,
        state.productList = action.payload.data
    }).addCase(getShopProduct.rejected,(state,action)=>{
        state.isLoading = false,
        state.productList = [];
    })
  },
});


export default shopProductSlice.reducer
