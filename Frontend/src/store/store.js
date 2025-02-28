import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import productSlice from "./admin/product.slice";
import shopProductSlice from "./shop/shopProduct.slice";
import shoppingCartSlice from "./shop/cart.slice";



const store = configureStore({
    reducer :{
        auth : authReducer,
        adminProducts : productSlice,
        shopProducts : shopProductSlice,
        shoppingCart : shoppingCartSlice,
    }
});


export default store;