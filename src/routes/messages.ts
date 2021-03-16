import { Router } from "express";
import controller from "@controllers/messages";

const router = Router();

router.post("/", controller.createMessage);

export default router;