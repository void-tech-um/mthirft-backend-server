import express from "express";
import db from "../models";
const itemRouter = express.Router();

/**
 * @route GET /items/:id
 */
itemRouter.get("/:id", async (req, res) => {
  // get item id
  const id = req.params.id;
  const item = await db.item.getItem(parseInt(id))
  const response = {
    item,
    url: req.originalUrl
  }
  res.send(response);
});

/**
 * @route GET /items/
 */
itemRouter.get("/", async (req, res) => {
  const items = await db.item.getItems()
  res.send(items)
});

/**
 * @route POST /items/
 */
itemRouter.post("/", async (req, res) => {
  const item = req.body;
  const createdItem = await db.item.createItem(item)
  res.send(createdItem)
});

/**
 * @route PUT /items/:id
 */
itemRouter.put("/:id", async (req, res) => {
  const item = req.body;
  const updatedItem = await db.item.updateItem(item);
  res.send(updatedItem);
});

/**
 * @route DELETE /items/:id
 */
itemRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedItem = await db.item.deleteItem(parseInt(id));
  res.sendStatus(204);
}); 

// /** 
//  * @route GET /items/wishlist/
//  */
// itemRouter.get("/wishlist/:id", async (req, res) => {



export default itemRouter;
