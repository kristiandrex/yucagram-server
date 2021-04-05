import { Request, Response } from "express";
import User from "@models/user";

async function verifyAuth(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.findById(res.locals.user, "-chats");

    if (!user) {
      res
        .status(404)
        .send({ ok: false, message: "Este usuario no está registrado." });
      return;
    }

    res.send(user);
  } catch (error) {
    res
      .status(500)
      .send({ ok: false, message: "Hubo un error, intenta más tarde" });
    console.error(error);
  }
}

export default {
  verifyAuth
};
