import express from "express";
import { hashPassword } from "../middleware";
import * as controller from "../controllers/user.controller";

const userRouter = express.Router();

// Update User
userRouter.put("/", controller.updateUserController);

export default userRouter;
