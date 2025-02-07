import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    brand: {
      required: true,
      type: String,
    },
    category: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    salesPrice: {
       type: Number
    },
    totalStock: {
      required: true,
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
