import express from "express";
import { hashPassword } from "../middleware";
import * as controller from "../controllers/user.controller";

const userRouter = express.Router();

// Create User 
userRouter.post("/", hashPassword, controller.createUserController);

// Update User 
userRouter.put("/", controller.updateUserController);


export default userRouter;
