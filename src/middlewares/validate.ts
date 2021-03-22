import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";
import isEmail from "validator/lib/isEmail";
import User from "@models/user";
import {
  invalidEmail,
  invalidUsername,
  unavailableUsername,
  patternUsername,
  UserI
} from "@types";

export function validateFields(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send(errors.mapped());
    return;
  }

  next();
}

export function checkUsername(username: string): ValidationChain {
  if (!username.match(patternUsername)) {
    throw new Error(invalidUsername);
  }

  return User.findOne({ username }).then((user: UserI) => {
    if (user) {
      return Promise.reject(unavailableUsername);
    }
  });
}

export function checkEmail(email: string): ValidationChain {
  if (!isEmail(email)) {
    throw new Error(invalidEmail);
  }

  return User.findOne({ email }).then((user: UserI) => {
    if (user) {
      return Promise.reject(unavailableUsername);
    }
  });
}
