import { Router } from "express";
import authToken from "../middlewares/authToken";
import User from "../models/user";

const router = Router();

router.put("/avatar", authToken, async (req, res) => {
  try {
    await User.findByIdAndUpdate(res.locals.user, { avatar: req.body.avatar });
    res.sendStatus(200);
  }

  catch (error) {
    console.error(error);
    res.status(500);
  }
});

export default router;