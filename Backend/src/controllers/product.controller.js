import { ImageUpload } from "../config/cloudinary.js";
import Product from "../models/product.model.js";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = req.file.buffer.toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    // const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUpload(url);
    res.status(200).json({ success: true, imageUrl: result.secure_url });
  } catch (error) {
    console.log("error in handleImageUpload controller", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};

//add a new Product
export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salesPrice,
      totalStock,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !brand ||
      !price || 
      !salesPrice ||
      !totalStock
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salesPrice,
      totalStock,
    });

    const saveProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: saveProduct,
    });
  } catch (error) {
    console.log("error in addProduct", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};

//fetch all the product
export const fetchProduct = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({ success: true, data: allProducts });
  } catch (error) {
    console.log("error in fetchProduct", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};

//edit a product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salesPrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findOne(id);
    if (!findProduct) {
      res.status(404).json({ success: false, message: "product not found" });
    }
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salesPrice = salesPrice || findProduct.salesPrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    await findProduct.save();
    res.status(200).json({ success: true, data: findProduct });
  } catch (error) {
    console.log("error in editProduct", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};
//delete a Product
export const deleteProduct = async (req, res) => {
  try {
    const {id}= req.params;
    const deletedProduct = await Product.findOneAndDelete(id);
    if(!deletedProduct){
      return res.status(404).json({success:false , message : "product not found"});
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data : deletedProduct,
    });
  } catch (error) {
    console.log("error in deleteProduct", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};
