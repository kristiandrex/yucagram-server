import { Router } from 'express';
import { upload } from '../services/multer';
import path from 'path';
import cloudinary from '../services/cloudinary';
import { promises as fs } from 'fs';

const router = Router();

router.post('/', upload.single('avatar'), async (req, res) => {
   try {
      const file = path.resolve(__dirname, '../../uploads/', req.file.filename);
      const upload = await cloudinary.uploader.upload(file);

      await fs.unlink(file);

      res.send({ url: upload.secure_url });
   }

   catch (error) {
      console.error(error);
   }

});

router.get('/:filename', (req, res) => {
   const filename: string = req.params.filename;

   res.sendFile(path.resolve(__dirname, '../../uploads', filename));
});

export default router;