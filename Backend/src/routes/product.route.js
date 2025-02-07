import express from "express";

import { addProduct, deleteProduct, editProduct, fetchProduct, handleImageUpload } from "../controllers/product.controller.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.post("/upload-image",upload.single("my_file"),handleImageUpload);


router.post("/add",addProduct);
router.get("/all", fetchProduct);
router.put("/update/:id",editProduct)
router.delete("/delete/:id", deleteProduct)

export default router;


