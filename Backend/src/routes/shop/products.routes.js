import express from "express";
import { getFilterProducts, getProductsDetails } from "../../controllers/shop/shop.controller.js";

const router = express.Router();

router.get("/all",getFilterProducts);
router.get("/detail/:id" , getProductsDetails)


export default router;