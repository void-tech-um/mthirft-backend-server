import express from "express";
import authRouter from "./routes/auth.routes";
import itemsRouter from "./routes/items.routes";
import userRouter from "./routes/user.routes";

const router = express.Router();
/** @route GET /api */
router.get("/", (req, res) => {
  res.send({
    items: "/api/items",
    auth: "/api/auth",
    user: "/api/user",
    url: req.originalUrl,
  });
});
router.use("/items", itemsRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
