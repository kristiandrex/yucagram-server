import { Router } from "express";
import { availableEmail, availableUsername } from "@controllers/validate";

const router = Router();
router.get("/username", availableUsername);
router.get("/email", availableEmail);

export default router;
