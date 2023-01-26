import express from "express";
import authRouter from "./auth";
import itemsRouter from "./items";
import userRouter from "./user";

const router = express.Router();
/** @route GET /api */
router.get("/", (req, res) => {
  res.send({
    items: "/items",
    auth: "/auth",
    user: "/user",
    url: req.originalUrl,
  });
});
router.use("/items", itemsRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
