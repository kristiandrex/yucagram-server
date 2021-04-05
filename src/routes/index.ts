import { Router } from "express";
import auth from "@routes/auth";
import forgotPassword from "@routes/forgot-password";
import newPassword from "@routes/new-password";
import signin from "@routes/signin";
import signup from "@routes/signup";
import validate from "@routes/validate";

const router = Router();

router.use("/auth", auth);
router.use("/forgot-password", forgotPassword);
router.use("/new-password", newPassword);
router.use("/signin", signin);
router.use("/signup", signup);
router.use("/validate", validate);

export default router;
