import { User } from "./models";
import { Item } from "./models";

/**
 * @desc Check if user exists and return user
 * @param {User} user object
 * @returns {Promise<User | null>} Username or null if user does not exist or password is incorrect
 */
export const getUser = async (user: User): Promise<User | null> => {
  // Check if user exists
  const userExists = await User.findOne({
    where: {
      username: user.username,
    },
  });
  return userExists;
};

/**
 * @desc Create a new user
 * @param {User} user
 * @returns {Promise<User>} Created user or error if user already exists
 * @throws {Error} If user does not exist
 */

//Create User 
export const createUser = async (user: any): Promise<User> => {
  // Check if user already exists
  const userExists = await getUser(user);
  if (userExists) {
    throw new Error("User already exists");
  }
  // Create user
  const newUser = await User.create(user);
  return newUser;
};

//Update user (called on user thats already loggin)
export const updateUser = async (user: any): Promise<[affectedCount: number]> => {
  // Update user
  const updatedUser = await User.update(user, {
    //'where' finds which user 
    where: {
      username: user.username
    }
  });
  return updatedUser;
}; 

/**
 * @desc Get all items owned by user
 * @returns {Promise<Item[]>} All items owned by user
 * @throws {Error} If user does not exist
 */
export const getItems = async (user: User): Promise<Item[]> => {
  // Check if user exists
  const userExists = await getUser(user);
  if (!userExists) {
    throw new Error("User does not exist");
  }
  // Get items
  const items = await Item.findAll({
    where: {
      username: user.username,
    },
  });
  return items;
};

/**
 * @desc Create a new item
 * @param {Item} item
 * @returns {Promise<Item>} Created item
 * @throws {Error} If user does not exist
 */
export const createItem = async (user: User, item: Item): Promise<Item> => {
  // Check if user exists
  const userExists = await getUser(user);
  if (!userExists) {
    throw new Error("User does not exist");
  }
  // Create item
  const newItem = await Item.create({
    ...item,
    username: user.username,
  });
  return newItem;
};
