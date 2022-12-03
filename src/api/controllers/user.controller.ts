import db from "../../models";
import { generateAccessToken } from "../utils";

export const createUserController = async (
  req: any,
  res: any
): Promise<void> => {
  //Create a new user
  const user = {
    username: req.body.username,
    fullName: req.body.fullName,
    password: req.body.password,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  };
  console.log(user);

  //Created a new user in database
  const createdUser = await db.user.createUser(user);
  console.log(createdUser);

  //Generate a token
  const token = generateAccessToken(user.username);
  console.log(token);

  //Returns user, email, and token
  res.send({
    username: createdUser.username,
    email: createdUser.email,
    token: token,
  });
};

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

