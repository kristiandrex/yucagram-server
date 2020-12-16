import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads")
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now().toString().concat(ext));
  }
});

export default multer({ storage });