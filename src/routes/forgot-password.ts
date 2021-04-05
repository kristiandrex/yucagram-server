import controller from "@controllers/forgot-password";
import { Router } from "express";

const router = Router();
router.post("/", controller);

export default router;
