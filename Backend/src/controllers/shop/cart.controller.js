import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data Provided",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    //if product isnot in cart it add the product with quantity else increment the quantity
    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }
    await cart.save();
    res.status(200).json({
      success: true,
      dart: cart,
    });
  } catch (error) {
    console.log("error in addtocart Controller", error.message);
    res.satus(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const carts = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salesPrice",
    });

    if (!carts) {
      return res.status(400).json({
        success: false,
        message: "Carts not found!",
      });
    }

    //Filtering Out Invalid Items or null
    //Sometimes, a product might get deleted from the database, but the cart might still have that product.

    const validItems = carts.items.filter(
      (productItem) => productItem.productId
    );
    if (validItems.length < carts.items.length) {
      carts.items = validItems;
      await carts.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salesPrice: item.productId.salesPrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...carts._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log("error in fetchCartItems Controller", error.message);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "invalid data provided!",
      });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Cart not found",
      });
    }
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentProductIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "CartItem not present",
      });
    }
    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salesPrice",
    });
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product Not Found",
      price: item.productId ? item.productId.price : null,
      salesPrice: productId.salesPrice ? item.productId.salesPrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log("error in updateCartQuantity Controller", error.message);
    res.satus(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "invalid data provided!",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salesPrice",
    });
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Cart not found",
      });
    }
    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salesPrice",
    });
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product Not Found",
      price: item.productId ? item.productId.price : null,
      salesPrice: item.productId ? item.productId.salesPrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log("error in delete Cart Controller", error.message);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
