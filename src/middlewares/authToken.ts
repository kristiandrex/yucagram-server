import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

export default async function authToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const _id = jwt.verify(<string>req.headers.authorization, <string>process.env.SEED);
    const user = await User.findById(_id, "-chats");

    if (!user) {
      res.sendStatus(400);
      return;
    }

    res.locals.user = user;
    next();
  }

  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}