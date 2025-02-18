import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import productSlice from "./admin/product.slice";
import shopProductSlice from "./shop/shopProduct.slice"



const store = configureStore({
    reducer :{
        auth : authReducer,
        adminProducts : productSlice,
        shopProducts : shopProductSlice,
    }
});


export default store;