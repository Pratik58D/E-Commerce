import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDb from "./src/config/db.js";
import authRouter from "./src/routes/auth.route.js";
import adminProductRouter from "./src/routes/product.route.js"
import shopProductrouter from "./src/routes/shop/products.routes.js";
import shopCartRouter from "./src/routes/shop/cart.route.js";

const app= express()
dotenv.config();

const port = process.env.PORT || 7001;

app.use(cors({
    origin : "http://localhost:5173",
    methods : ['GET','POST','DELETE', "PUT"],
    allowedHeaders :[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials : true
}));
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth",authRouter);
app.use("/api/admin/product",adminProductRouter);
app.use("/api/shop/product",shopProductrouter);
app.use("/api/shop/cart",shopCartRouter);


app.listen(port , ()=>{
    console.log(`server is running ${port}`);
    connectDb();
})