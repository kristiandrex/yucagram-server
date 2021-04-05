import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "@models/user";
import { sendMail } from "@services/mail";
import { clientUrl } from "@config";
import { UserI } from "@types";

async function controller(req: Request, res: Response): Promise<void> {
  try {
    const email = req.body.email;
    const user: UserI = await User.findOne({ email });

    if (!user) {
      res
        .status(404)
        .send({ ok: false, message: "El correo no se encuentra registrado." });
      return;
    }

    const token = jwt.sign({ email }, <string>process.env.SEED, {
      expiresIn: "1h"
    });

    const link = `${clientUrl}/new-password?token=${token}`;

    await sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "¿Olvidaste tu contraseña de Yucagram?",
      html: `
        <p>Para cambiar tu contraseña sigue este enlace, el cual vence en 1 hora: <a href=${link}>${link}</a></p>
      `
    });

    res.status(200).send({
      ok: true,
      message: "El enlace de recuperación fue enviado al correo."
    });
  } catch (error) {
    res
      .status(500)
      .send({ ok: false, message: "Hubo un error, intenta más tarde." });
    console.error(error);
  }
}

export default controller;
