import { User } from "./models";
import { Item } from "./models";

/**
 * @desc Create a new user
 * @param {User} user
 * @returns {Promise<User | boolean>} Created user or false if user already exists
 */
export const createUser = async (user: User): Promise<User | boolean> => {
  // Check if user already exists
  const userExists = await User.findOne({
    where: {
      username: user.username,
    },
  });
  if (userExists) {
    return false;
  }
  // Create user
  const newUser = await User.create(user);
  return newUser;
};

/**
 * @desc Check if user exists and return user
 * @param {User} user object
 * @returns {Promise<User | null>} Username or null if user does not exist or password is incorrect
 */
export const userExists = async (user: User): Promise<User | null> => {
  // Check if user exists
  const userExists = await User.findOne({
    where: {
      username: user.username,
    },
  });
  return userExists;
};

/**
 * @desc Get all items owned by user
 * @param {string} username
 * @returns {Promise<Item[]>} All items owned by user
 * @throws {Error} If user does not exist
 */
export const getItems = async (username: string): Promise<Item[]> => {
  // Check if user exists
  const userExists = await User.findOne({
    where: {
      username,
    },
  });
  if (!userExists) {
    throw new Error("User does not exist");
  }
  // Get items
  const items = await Item.findAll({
    where: {
      userId: userExists.username,
    },
  });
  return items;
};

/**
 * @desc Create a new item
 * @param {string} username
 * @param {Item} item
 * @returns {Promise<Item>} Created item
 * @throws {Error} If user does not exist
 */
export const createItem = async (
  username: string,
  item: Item
): Promise<Item | boolean> => {
  // Check if user exists
  const userExists = await User.findOne({
    where: {
      username,
    },
  });
  if (!userExists) {
    throw new Error("User does not exist");
  }
  // Create item
  const newItem = await Item.create({
    ...item,
    userId: userExists.username,
  });
  return newItem;
};