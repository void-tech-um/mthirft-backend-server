
import express from "express";
//import { hashPassword } from "../middleware";
import * as controller from "../controllers/auth.controller";

const authRouter = express.Router();

// Login route post 
authRouter.post("/login", controller.authenticateUser);

// Export the authRouter
export default authRouter;