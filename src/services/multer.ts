import multer from 'multer';
import { v4 as uuid } from 'uuid';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, uuid() + '.png');
  }
});

const avatar = multer({ storage }).single('avatar');

export default {
  avatar
}
