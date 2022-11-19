import { User } from "./models";
import { Item } from "./models";

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
 * @desc Create a new user
 * @param {User} user
 * @returns {Promise<User>} Created user or error if user already exists
 * @throws {Error} If user does not exist
 */
export const createUser = async (user: User): Promise<User> => {
  // Check if user already exists
  if (userExists(user) !== null) {
    throw new Error("User already exists");
  }
  // Create user
  const newUser = await User.create(user);
  return newUser;
};

/**
 * @desc Get all items owned by user
 * @returns {Promise<Item[]>} All items owned by user
 * @throws {Error} If user does not exist
 */
export const getItems = async (user: User): Promise<Item[]> => {
  // Check if user exists
  if (!userExists(user)) {
    throw new Error("User does not exist");
  }
  // Get items
  const items = await Item.findAll({
    where: {
      userId: user.username,
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
export const createItem = async (user:User, item: Item): Promise<Item> => {
  // Check if user exists
  if (!userExists(user)) {
    throw new Error("User does not exist");
  }
  // Create item
  const newItem = await Item.create({
    ...item,
    userId: user.username,
  });
  return newItem;
};

