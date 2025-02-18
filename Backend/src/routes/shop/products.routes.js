import express from "express";
import { getFilterProducts } from "../../controllers/shop/shop.controller.js";

const router = express.Router();

router.get("/all",getFilterProducts)



export default router;