import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@models/user";

async function controller(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(404).send({
        ok: false,
        message: "El usuario y/o la contraseña no coinciden."
      });
      return;
    }

    const matchPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!matchPassword) {
      res.status(404).send({
        ok: false,
        message: "El usuario y/o la contraseña no coinciden."
      });
      return;
    }

    const token = jwt.sign(String(user._id), <string>process.env.SEED);
    res.send({ ok: true, user, token });
  } catch (error) {
    res
      .status(500)
      .send({ ok: false, message: "Hubo un errror, intenta más tarde." });
    console.error(error);
  }
}

export default controller;
