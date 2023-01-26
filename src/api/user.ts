import express from "express";
import { hashPassword } from "./middleware";
import db from "../models";

const userRouter = express.Router();

/**
 * @route PUT /user/
 */
userRouter.put("/", async (req: any, res: any): Promise<void> => {
  //Update a user
  const user = await db.user.updateUser(req.body.user);
  res.send(user);
});

/** 
 * @route DELETE /user/
 */
userRouter.delete("/", async (req: any, res: any): Promise<void> => {
  // Delete a user 
  const user = req.body.user;
  const deletedUser = await db.user.deleteUser(req.body.id);
  res.send(deletedUser);
}); 

/** 
 * @route GET /user/
 */
userRouter.get("/:username", async (req: any, res: any): Promise<void> => {
  //Get user 
  const user = await db.user.getUser(req.params.username);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  const userResponse = {
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    items: user.items,
    fullName: user.fullName,
    userBio: user.userBio,
    userPhoto: user.userPhoto,
    url: req.originalUrl,
  }
  res.send(userResponse);
});

export default userRouter;
