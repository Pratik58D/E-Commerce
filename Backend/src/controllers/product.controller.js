import { ImageUpload } from "../config/cloudinary.js";


export const handleImageUpload = async (req, res) => {
  try {
    const b64 = req.file.buffer.toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`
    // const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUpload(url) 
    res.status(200).json({ success: true, imageUrl: result.secure_url });
  } catch (error) {
    console.log("error in handleImageUpload controller", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};
