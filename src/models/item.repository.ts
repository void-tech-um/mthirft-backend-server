import { Item } from "./models";

/**
 * @desc Check if item exists and return item
 * @param {number} itemId
 * @returns {Promise<Item | null>} Item, if exists, else throw error
 */
export const getItem = async (itemId: number): Promise<Item | null> => {
  const item = await Item.findOne({
    where: {
      itemId,
    },
  });
  return item;
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
 * @param {any} item
 * @returns {Promise<[affectedCount: number]>} Updated item
 */
export const updateItem = async (
  item: any
): Promise<[affectedCount: number]> => {
  const updatedItem = await Item.update(item, {
    where: { itemId: item.itemId },
  });
  if (updatedItem[0] === 0) {
    throw new Error("Item does not exist");
  }
  return updatedItem;
};

/**
 * @desc Create a new item
 * @param {any} item
 * @returns {Promise<Item>} Created item
 */
export const createItem = async (item: any): Promise<Item> => {
  const newItem = await Item.create(item);
  return newItem;
};

/**
 * @desc Delete an item
 * @param {number} itemId
 * @returns {Promise<number>} Deleted item
 */
export const deleteItem = async (itemId: number): Promise<number> => {
  await getItem(itemId);
  const deletedItem = await Item.destroy({
    where: {
      itemId,
    },
  });
  if (deletedItem === 0) {
    throw new Error("Item does not exist");
  }
  return deletedItem;
};
