import * as model from "../../models/user.repository";
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

export const authenticateUser = async (
    req: any,
    res: any
): Promise<void> => {

    //get user username 
    const user = await model.getUser(req.body.username);
    console.log(user);

    //check if username is correct else throw error 
    if (!user) return res.status(401).send("Username or password is incorrect");

    //Get pasword
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    //Check if password is correct else throw error 
    if (!validPassword) return res.status(401).send("Username or password is incorrect");
 
    //NOTE: Token is stored in phone storage, logged in if its a valid token 
    //Make token and send 
    const token = generateAccessToken(user.username);
    res.send({
        username: user.username ,
        token: token,
        url: req.originalUrl
    })
};