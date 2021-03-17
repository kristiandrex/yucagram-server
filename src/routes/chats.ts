import { Router } from "express";
import controller from "@controllers/chat";

const router = Router();

router.get("/", controller.getChats);
router.post("/", controller.createChat);
router.get("/:user", controller.getChat);
router.get("/:_id/messages", controller.getMessages);

export default router;
