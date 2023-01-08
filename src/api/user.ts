import express from "express";
import { hashPassword } from "./middleware";
import db from "../models";

const userRouter = express.Router();

// Update User
userRouter.put("/", async (req: any, res: any): Promise<void> => {
  //Update a user
  const user = await db.user.updateUser(req.body.user);
  res.send(user);
});

//Delete user?

// get a user

export default userRouter;
