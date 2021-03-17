import { Router } from "express";
import User from "@models/user";
import authToken from "@middlewares/authToken";

const router = Router();

router.post("/", authToken, async (req, res) => {
  try {
    const { value, ignore } = req.body;

    const users = await User.find(
      { username: { $regex: value, $nin: ignore } },
      "avatar username role"
    ).limit(5);

    res.send(users);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

export default router;
