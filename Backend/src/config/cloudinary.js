import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

async function ImageUpload(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "e-commerce",
  });

  return result;
}

//multer handling

// immediately process or upload files
const storage = new multer.memoryStorage();
//upload becomes middleware for handling file uploads in the routes.
const upload = multer({ storage });

export { upload, ImageUpload , cloudinary };
