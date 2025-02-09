import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized user !" });
  }
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeToken) {
      return res.status(401).json({ success: false, message: "Unauthorized user!" });
    }
    req.user = decodeToken;
    next();
  } catch (error) {
    console.log("error in auth middleware", error.message);
    return res.status(401).json({ success: false, message: "unauthorised user!" });
  }
};



