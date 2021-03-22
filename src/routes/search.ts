import { Router } from "express";
import authToken from "@middlewares/authToken";
import controller from "@controllers/search";

const router = Router();
router.post("/", authToken, controller);

export default router;
