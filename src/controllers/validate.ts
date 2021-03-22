import { Request, Response } from "express";
import isEmail from "validator/lib/isEmail";
import User from "@models/user";
import {
  invalidEmail,
  invalidUsername,
  patternUsername,
  unavailableEmail,
  unavailableUsername
} from "@types";

type FieldAvailable = {
  available: boolean;
  message: string;
};

async function availableUsername(req: Request, res: Response): Promise<void> {
  try {
    const value = <string>req.query.value;

    if (!patternUsername.test(value)) {
      res.send(<FieldAvailable>{
        available: false,
        message: invalidUsername
      });
      return;
    }

    const user = await User.findOne({ username: value });

    if (user) {
      res.send(<FieldAvailable>{
        available: false,
        message: unavailableUsername
      });
      return;
    }

    res.send(<FieldAvailable>{
      available: true,
      message: ""
    });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

async function availableEmail(req: Request, res: Response): Promise<void> {
  try {
    const value = <string>req.query.value;

    if (!isEmail(value)) {
      res.send(<FieldAvailable>{
        available: false,
        message: invalidEmail
      });
      return;
    }

    const user = await User.findOne({ email: value });

    if (user) {
      res.send(<FieldAvailable>{
        available: false,
        message: unavailableEmail
      });
      return;
    }

    res.send(<FieldAvailable>{
      available: true,
      message: ""
    });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export { availableUsername, availableEmail };
