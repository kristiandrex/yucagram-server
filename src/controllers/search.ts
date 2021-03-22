import User from "@models/user";
import { Request, Response } from "express";

async function controller(req: Request, res: Response): Promise<void> {
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
}

export default controller;
