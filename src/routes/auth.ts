import { Router } from "express";
import authToken from "@middlewares/authToken";
import search from "@routes/search";
import chats from "@routes/chats";
import upload from "@routes/upload";
import messages from "@routes/messages";
import controller from "@controllers/auth";

const router = Router();

router.use(authToken);
router.get("/", controller.verifyAuth);
router.use("/messages", messages);
router.use("/search", search);
router.use("/chats", chats);
router.use("/upload", upload);

export default router;