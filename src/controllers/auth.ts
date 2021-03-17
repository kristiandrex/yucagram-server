import { Request, Response } from "express";
import User from "@models/user";
import { UserI } from "@types";

function verifyAuth(req: Request, res: Response): void {
  User.findById(res.locals.user, "-chats")
    .then((user: UserI) => res.send(user))
    .catch((error: Error) => {
      res.sendStatus(400);
      console.error(error);
    });
}

export default {
  verifyAuth
};
