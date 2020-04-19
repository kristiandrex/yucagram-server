import { Router } from 'express';
import cloudinary from '../services/cloudinary';
import multer from '../services/multer';

const router = Router();

router.post('/avatar', multer.avatar, async (req, res) => {
  try {
    const upload = await cloudinary.uploader.upload(req.file.path);
    res.send(upload);
  } catch (error) {
    res.send({ error });
  }
});

export default router;
