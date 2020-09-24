import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { UserI } from '../@types';
import User from '../models/user';

export default async function authToken(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = jwt.verify(<string>req.headers.authorization, <string>process.env.SEED);
    const user: UserI = <UserI>await User.findOne({ _id });

    if (!user) {
      return res.sendStatus(400);
    }

    res.locals.user = user;
    next();
  }

  catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
}
