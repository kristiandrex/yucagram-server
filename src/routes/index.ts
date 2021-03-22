import { Router } from "express";
import signup from "@routes/signup";
import signin from "@routes/signin";
import auth from "@routes/auth";
import validate from "@routes/validate";

const router = Router();

router.use("/auth", auth);
router.use("/validate", validate);
router.use("/signup", signup);
router.use("/signin", signin);

export default router;
