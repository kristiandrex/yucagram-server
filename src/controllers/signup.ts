import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@models/user";

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const { username, email } = req.body;

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign(user._id.toString(), <string>process.env.SEED);
    res.send({ token, user });
  }

  catch (error) {
    console.log(error);
    res.status(500);
  }
}