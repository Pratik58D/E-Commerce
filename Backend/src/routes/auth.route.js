import express from "express";
import { login, logout, register , checkAuth } from "../controllers/auth.controller.js";
import {authMiddleware} from "../middeleware/auth.js";


const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.post ("/logout",logout);
authRouter.get("/check-auth", authMiddleware,checkAuth)


export default authRouter;