import express from "express";

const itemRouter = express.Router();

/**
 * @route GET /items
 */
itemRouter.get("/", (req, res) => {
  res.send("Get one item");
});

export default itemRouter;
