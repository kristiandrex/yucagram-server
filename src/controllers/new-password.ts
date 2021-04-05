import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "@models/user";
import TokenError from "@util/TokenError";
import verifyToken from "@util/verifyToken";
import { UserI } from "@types";

function get(req: Request, res: Response): void {
  try {
    verifyToken(req.headers.authorization);
    res.status(200).send({ ok: true });
  } catch (error) {
    res
      .status(401)
      .send({ ok: false, message: "Enlace de recuperación inválido." });
  }
}

async function post(req: Request, res: Response): Promise<void> {
  try {
    const token = verifyToken(req.headers.authorization);
    const { password, repeat, email } = req.body;

    if (token.email !== email) {
      res.status(401).send({
        ok: false,
        message: "Este enlace de recuperación no corresponde a esta cuenta."
      });
      return;
    }

    if (password !== repeat) {
      res
        .status(400)
        .send({ ok: false, message: "Las contraseñas no coinciden." });
      return;
    }

    const user: UserI = await User.findOne({ email });

    if (!user) {
      res.status(404).send({
        ok: false,
        message: "No hay ninguna cuenta registrada con este correo."
      });
      return;
    }

    if (bcrypt.compareSync(password, user.password)) {
      res.status(400).send({
        ok: false,
        message: "La contraseña debe ser distinta a las usadas anteriormente."
      });
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    user.password = hashPassword;
    user.save();

    res.status(200).send({
      ok: true,
      message: "La contraseña fue cambiada satisfactoriamente."
    });
  } catch (error) {
    if (error instanceof TokenError) {
      res
        .status(401)
        .send({ ok: false, message: "Enlace de recuperación inválido." });
      return;
    }

    res
      .status(500)
      .send({ ok: false, message: "Hubo un error, intenta más tarde." });
  }
}

const controller = {
  get,
  post
};

export default controller;
