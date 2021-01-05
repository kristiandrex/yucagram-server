import { Router } from "express";
import search from "./search";
import chats from "./chats";
import upload from "./upload";
import User from "../models/user";
import authToken from "../middlewares/authToken";

const router = Router();
router.use(authToken);

router.get("/", async function (_, res) {
  try {
    const user = await User.findById(res.locals.user, "-chats");
    res.send(user);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.use("/search", search);
router.use("/chats", chats);
router.use("/upload", upload);

export default router;