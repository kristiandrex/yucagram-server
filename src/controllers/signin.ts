import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    const password: boolean = bcrypt.compareSync(req.body.password, user.password);

    if (!password) {
      res.sendStatus(400);
      return;
    }

    const token = jwt.sign(user._id.toString(), <string>process.env.SEED);
    res.send({ user, token });
  }

  catch (error) {
    console.log(error);
    res.status(500).send("Intenta más tarde");
  }
}