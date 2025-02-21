import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const getShopProduct = createAsyncThunk("/product/all", 
  async ({filterParams , sortParams}) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy : sortParams
    })
  const result = await axios.get(`http://localhost:7000/api/shop/product/all?${query}`);
 
  return result?.data;
});

export const getProductDetails = createAsyncThunk("/product/detail", 
  async (id) => {
  const result = await axios.get(`http://localhost:7000/api/shop/product/detail/${id}`);
 
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
   builder.addCase(getProductDetails.pending,(state)=>{
      state.isLoading = true
  }).addCase(getProductDetails.fulfilled,(state,action)=>{
    console.log(action.payload.data);
      state.isLoading = false,
      state.productDetails = action.payload.data
  }).addCase(getProductDetails.rejected,(state,action)=>{
      state.isLoading = false,
      state.productDetails = null;
  })
  },
});


export default shopProductSlice.reducer
