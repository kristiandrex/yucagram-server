import { Router } from "express";
import controller from "@controllers/new-password";

const router = Router();

router.get("/", controller.get);
router.post("/", controller.post);

export default router;
