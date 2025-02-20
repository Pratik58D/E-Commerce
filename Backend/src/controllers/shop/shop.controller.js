import Product from "../../models/product.model.js";

//fetching product for shop
export const getFilterProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-low-high" } = req.query;
    let filters = {};
    if (category.length) {
      //we are dynamicaly adding category inside filter
      filters.category = { $in: category.split(",") };
    }
    if (brand.length) {
      //we are dynamicaly adding brand inside filter
      filters.brand = { $in: brand.split(",") };
    }
    let sort = {};
    switch (sortBy) {
      case "price-low-high":
        sort.price = 1;
        break;
      case "price-high-low":
        sort.price = -1;
        break;
      case "a-z":
        sort.title = 1;
        break;
      case "z-a":
        sort.title = -1;
        break;

      default:
        sort.title = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({ sucess: true, data: products });
  } catch (error) {
    console.log("error in shop product controller", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};
