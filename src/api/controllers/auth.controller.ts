import db from "../../models";
import { generateAccessToken } from "../utils";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 * @param {any} req
 * @param {any} res
 * @returns {Promise<void>}
 */
export const authenticateUser = async (req: any, res: any): Promise<void> => {
  //get user username
  console.log(req.body);
  const user = await db.user.getUser(req.body.username);
  console.log(user);

  //check if username is correct else throw error
  if (!user) return res.status(401).send("Username or password is incorrect");

  //Get pasword
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  console.log(validPassword);

  //Check if password is correct else throw error
  if (!validPassword)
    return res.status(401).send("Username or password is incorrect");

  //NOTE: Token is stored in phone storage, logged in if its a valid token
  //Make token and send
  const token = generateAccessToken(user.username);
  res.send({
    username: user.username,
    token: token,
    url: req.originalUrl,
  });
};

/**
 * @route POST /api/auth/signup
 * @desc Create a user
 * @access Public
 * @param {any} req
 * @param {any} res
 * @returns {Promise<void>}
 */

export const createUser = async (req: any, res: any): Promise<void> => {
  //Create a new user
  const user = req.body;
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
