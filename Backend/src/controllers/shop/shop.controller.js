import Product from "../../models/product.model.js"

//fetching product for shop
export const getFilterProducts = async(req,res) =>{
    try {
        const products = await Product.find({});

        res.status(200).json({ sucess: true, data: products });

        
    } catch (error) {
        console.log("error in shop product controller", error.message);
        res.status(500).json({ sucess: false, message: "Server error" });
      }
}