import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@models/user";

async function controller(req: Request, res: Response): Promise<void> {
  const { username, email } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new User({ username, email, password });
    const token = jwt.sign(user._id.toString(), <string>process.env.SEED);
    await user.save();

    res.status(201).send({
      ok: true,
      message: "El usuario se registró correctamente.",
      token,
      user
    });
  } catch (error) {
    res
      .status(500)
      .send({ ok: false, message: "Hubo un error, intenta más tarde." });
    console.error(error);
  }
}

export default controller;
