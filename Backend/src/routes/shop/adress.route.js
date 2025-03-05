import express from "express";
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from "../../controllers/shop/Address.controller.js";


const router = express.Router();

router.get("get/:userId",fetchAllAddress);
router.post("/add", addAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/edit/:userId/:addressId", editAddress);


export default router