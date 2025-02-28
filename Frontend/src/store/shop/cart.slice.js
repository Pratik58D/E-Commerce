import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const result = await axios.post(`http://localhost:7000/api/shop/cart/add`, {
      userId,
      productId,
      quantity,
    });
    return result.data;
  }
);
export const fetchCardItems = createAsyncThunk(
  "cart/fetchCardItems",
  async (userId) => {
    const result = await axios.get(
      `http://localhost:7000/api/shop/cart/get/${userId}`
    );
    return result.data;
  }
);
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, productId, quantity }) => {
    const result = await axios.put(
      `http://localhost:7000/api/shop/cart/update`,
      {
        userId,
        productId,
        quantity,
      }
    );
    return result.data;
  }
);
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const result = await axios.post(
      `http://localhost:7000/api/shop/cart/delete/${userId}/${productId}`
    );
    return result.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shopppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending ,(state)=>{
        state.isLoading = truu;
    }).addCase(addToCart.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.cartItems = action.payload.data;
    }).addCase(addToCart.rejected,(state)=>{
        state.isLoading = false;
        state.cartItems = []

    })
    .addCase(fetchCardItems.pending ,(state)=>{
        state.isLoading = true;
    }).addCase(fetchCardItems.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.cartItems = action.payload.data;
    }).addCase(fetchCardItems.rejected,(state)=>{
        state.isLoading = false;
        state.cartItems = []

    })
    .addCase(updateCart.pending ,(state)=>{
        state.isLoading = true;
    }).addCase(updateCart.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.cartItems = action.payload.data;
    }).addCase(updateCart.rejected,(state)=>{
        state.isLoading = false;
        state.cartItems = []

    })
    .addCase(deleteCartItem.pending ,(state)=>{
        state.isLoading = false;
    }).addCase(deleteCartItem.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.cartItems = action.payload.data;
    }).addCase(deleteCartItem.rejected,(state)=>{
        state.isLoading = false;
        state.cartItems = []

    });
  },
});


export default shoppingCartSlice.reducer;