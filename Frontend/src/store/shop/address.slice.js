import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/address/add",
  async (formData ) => {
    const result = await axios.post(
      `http://localhost:7000/api/shop/address/add`,
      { formData }
    );
    return result?.data;
  }
);

export const fetchAllAddress = createAsyncThunk(
  "/address/fetch",
  async ({ userId }) => {
    const result = await axios.get(
      `http://localhost:7000/api/shop/address/get/${userId}`
    );
    return result?.data;
  }
);

export const editAddress = createAsyncThunk(
  "/address/edit",
  async ({ userId, addressId, formData }) => {
    const result = await axios.put(
      `http://localhost:7000/api/shop/address//edit/${userId}/${addressId}`,
      { formData}
    );
    return result?.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/address/delete",
  async ({ userId, addressId }) => {
    const result = await axios.delete(
      `http://localhost:7000/api/shop/address//delete/${userId}/${addressId}`
    );
    return result?.data;
  }
);

const shopAddressSlice = createSlice({
  name: "shoppingAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        console.log("address info: ", action.payload.state);
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = true;
        state.addressList = [];
      })
      //fetching
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        console.log("address info: ", action.payload.state);
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = true;
        state.addressList = [];
      })
      //updating
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        console.log("address info: ", action.payload.state);
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = true;
        state.addressList = [];
      })
      //deleteing
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        console.log("address info: ", action.payload.state);
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = true;
        state.addressList = [];
      });
  },
});

export default shopAddressSlice.reducer;
