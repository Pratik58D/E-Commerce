import express from "express";
import { addToCart, deleteCartItem, fetchCartItems, updateCartQuantity } from "../../controllers/shop/cart.controller.js";

const router = express.Router();


router.post("/add",addToCart);
router.get("/get/:userid",fetchCartItems);
router.put("/update",updateCartQuantity);
router.delete("/delete/:userId/:productId",deleteCartItem);