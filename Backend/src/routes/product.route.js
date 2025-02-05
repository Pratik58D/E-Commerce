import express from "express";

import { handleImageUpload } from "../controllers/product.controller.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.post("/upload-image",upload.single("my_file"),handleImageUpload);

export default router;


