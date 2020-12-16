import { Router } from "express";
import controller from "../controllers/chat";

const router = Router();

router.get("/", controller.getChats);
router.get("/:user", controller.getChat);
router.post("/", controller.createChat);

export default router;