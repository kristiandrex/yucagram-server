import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@models/user";

async function signup(req: Request, res: Response): Promise<void> {
  const { username, email } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new User({ username, email, password });
    const token = jwt.sign(user._id.toString(), <string>process.env.SEED);
    await user.save();

    res.send({ token, user });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export default signup;
