import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import User from '../models/user';
import { UserI } from '../@types';

export default async function authToken(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = jwt.verify(<string>req.headers.authorization, <string>process.env.SEED);
    const user: UserI = <UserI>await User.findById(Types.ObjectId(<string>_id));

    if (!user) {
      return res.sendStatus(400);
    }

    res.locals.user = user;

    next();
  } catch (error) {
    res.sendStatus(400);
  }
}
