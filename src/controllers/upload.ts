import path from "path";
import sharp from "sharp";
import { Request, Response } from "express";
import cloudinary from "@services/cloudinary";
import User from "@models/user";

async function uploadAvatar(req: Request, res: Response): Promise<void> {
  try {
    const file = path.resolve(req.file.path);
    const area = JSON.parse(req.body.area);
    const newFile = path.resolve("uploads/avatar/cropped/" + req.file.filename);

    await sharp(file)
      .extract({
        height: area.height,
        width: area.width,
        top: area.y,
        left: area.x
      })
      .resize({ width: 150, height: 150 })
      .toFile(newFile);

    const upload = await cloudinary.uploader.upload(newFile);
    await User.findByIdAndUpdate(res.locals.user, {
      avatar: upload.secure_url
    });

    res.send(upload.secure_url);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export default {
  uploadAvatar
};
