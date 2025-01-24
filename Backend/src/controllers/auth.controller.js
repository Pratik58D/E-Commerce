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

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ sucess: true, message: "User registered successfully" });
  } catch (error) {
    console.log("error in register", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};

//logout

export const logout = async (req, res) => {
  try {
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};

//auth middleware

export const Auth = async (req, res) => {
  try {
  } catch (error) {
    console.log("error in auth controller", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};
