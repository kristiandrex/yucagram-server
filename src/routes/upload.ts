import { Router } from "express";
import multer from "@services/multer";
import checkFolders from "@middlewares/checkfolders";
import controller from "@controllers/upload";

const router = Router();

router.use(checkFolders);
router.post("/avatar", multer.single("avatar"), controller.uploadAvatar);

export default router;
