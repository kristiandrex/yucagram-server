import { Router } from 'express';
import multer from '../services/multer';
import path from 'path';
import sharp from 'sharp';
import cloudinary from '../services/cloudinary';
import User from '../models/user';

const router = Router();

router.post('/avatar', multer.single('avatar'), async (req, res) => {
  try {
    const file = path.resolve(req.file.path);
    const ext = path.extname(req.file.filename);
    const basename = path.basename(req.file.filename, ext);
    const region = JSON.parse(req.body.region);
    const newFile = path.resolve('uploads/' + basename + '.cropped' + ext);

    await sharp(file)
      .extract(region)
      .resize({ width: 150 })
      .toFile(newFile);

    const upload = await cloudinary.uploader.upload(newFile);
    await User.findByIdAndUpdate(res.locals.user._id, { avatar: upload.secure_url });
    
    res.send(upload.secure_url);
  }

  catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

export default router;