import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export default function validateFields(
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
