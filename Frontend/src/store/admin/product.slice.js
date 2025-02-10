import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList : [],
};

export const createProduct = createAsyncThunk(
  "/product/add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/admin/product/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response?.data;
    } catch (err) {
      return rejectWithValue(err.response.data); //Automatically handled in "rejected"
    }
  }
);

export const getProducts = createAsyncThunk(
  "/product/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/admin/product/all"
      );
      return response?.data;
    } catch (err) {
      return rejectWithValue(err.response.data); //Automatically handled in "rejected"
    }
  }
);

export const editProduct = createAsyncThunk(
  "/product/update",
  async ({id, formData}, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:7000/api/admin/product/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response?.data;
    } catch (err) {
      return rejectWithValue(err.response.data); //Automatically handled in "rejected"
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/product/delete",
  async (id , { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:7000/api/admin/product/delete/${id}`,
       );
      return response?.data;
    } catch (err) {
      return rejectWithValue(err.response.data); //Automatically handled in "rejected"
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log("this is in product slice",action.payload)
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [],
        state.error = action.payload; // This contains the error message
      });
  },
});

export default productSlice.reducer;
