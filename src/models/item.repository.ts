import { Item } from "./models";

/**
 * @desc Check if user exists and return user
 * @param {Item} item object
 * @returns {Promise<Item | null>} Username or null if user does not exist or password is incorrect
 */
 export const itemExists = async (item: Item): Promise<Item | null> => {
  // Check if user exists
  const itemExists = await Item.findOne({
    where: {
      itemId: item.itemId,
    },
  });
  return itemExists;
};

/**
 * @desc Get all items
 * @returns {Promise<Item[]>} All items
 */
export const getItems = async (): Promise<Item[]> => {
  const items = await Item.findAll();
  return items;
};

/**
 * @desc Update an item
 * @param {number} itemId
 * @param {Item} item
 * @returns {Promise<[affectedCount: number]>} Updated item
 */
export const updateItem = async (itemId: number,item: Item): Promise<[affectedCount: number]> => {
  if(!itemExists(item)){
    throw new Error("Item does not exist");
  }
  const updatedItem = await Item.update(item, {
    where: { itemId },
  });
  return updatedItem;
};

/**
 * @desc Create a new item
 * @param {Item} item
 * @returns {Promise<Item>} Created item
 */
export const createItem = async (item: Item): Promise<Item> => {
  const newItem = await Item.create(item);
  return newItem;
};

/**
 * @desc Delete an item
 * @param {Item} item
 * @returns {Promise<number>} Deleted item
 */
export const deleteItem = async (item: Item): Promise<number> => {
  if (!itemExists(item)) {
    throw new Error("Item ID does not exist");
  }
  const deletedItem = await Item.destroy({
    where: { 
      itemId: item.itemId
    },
  });
  return deletedItem;
};
