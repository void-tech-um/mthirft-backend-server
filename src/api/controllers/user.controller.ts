import db from "../../models";
import { generateAccessToken } from "../utils";

//Update user in database (Change username, password etc. except email)
export const updateUserController = async (
  req: any,
  res: any
): Promise<void> => {
  //Update a user
  const user = await db.user.updateUser(req.body.user);
  res.send(user);
};

//Delete user?

// get a user
