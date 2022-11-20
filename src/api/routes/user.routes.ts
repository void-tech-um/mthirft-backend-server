import express from "express";
import { hashPassword } from "../middleware";
import * as controller from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/", hashPassword, controller.createUserController);

export default userRouter;
