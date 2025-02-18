import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//register
export const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ sucess: false, message: "Please fill all the fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log("error in register", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    const matchedUser = await User.findOne({ email });
    if (!matchedUser) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      matchedUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        id: matchedUser._id,
        role: matchedUser.role,
        email: matchedUser.email,
        userName : matchedUser.userName
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      })
      .status(200)
      .json({ 
        success: true,
        message: "User logged in successfully", 
        token,
        user :{
          email: matchedUser.email,
          role: matchedUser.role,
          id: matchedUser._id,
          userName : matchedUser.userName
        }
       });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};

//logout

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "User logged out sucessfully"});    
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};

//auth middleware

export const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "User is authenticated",
      user,
    })
  } catch (error) {
    console.log("error in auth controller", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};
