import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import productSlice from "./admin/product.slice"



const store = configureStore({
    reducer :{
        auth : authReducer,
        adminProducts : productSlice
    }
});


export default store;