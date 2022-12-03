import express from "express";
import { hashPassword } from "../middleware";
import * as controller from "../controllers/auth.controller";

const authRouter = express.Router();

// Login route post
authRouter.post("/login", controller.authenticateUser);

// Signup route post
authRouter.post("/signup", hashPassword, controller.createUser);

// Export the authRouter
export default authRouter;
