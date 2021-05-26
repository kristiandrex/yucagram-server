import { Response, NextFunction, Request } from "express";
import User from "@models/user";
import TokenError from "@util/TokenError";
import verifyToken from "@util/verifyToken";

export default async function authToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const _id = <string>verifyToken(req.headers.authorization);
    const user = await User.findById(_id);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.locals.user = user._id;
    next();
  } catch (error) {
    if (error instanceof TokenError) {
      res.sendStatus(401);
      return;
    }

    res.sendStatus(500);
    console.error(error);
  }
}
