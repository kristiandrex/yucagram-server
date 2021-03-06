import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import User from "@models/user";

export default async function authToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.headers.authorization) {
      res.sendStatus(401);
      return;
    }

    const _id = jwt.verify(req.headers.authorization, <string>process.env.SEED);
    const user = await User.findById(_id);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.locals.user = user._id;
    next();
  }

  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}