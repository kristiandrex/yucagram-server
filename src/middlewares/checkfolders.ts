import { Request, Response, NextFunction } from "express";
import fs from "fs";

export default function checkFolders(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const avatarFolder = "uploads/avatar/cropped";

  if (!fs.existsSync(avatarFolder)) {
    fs.mkdirSync(avatarFolder, { recursive: true });
  }

  next();
}
