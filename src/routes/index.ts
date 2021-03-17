import { Router } from "express";
import { check } from "express-validator";
import validateFields from "@middlewares/validateFields";
import signup from "@controllers/signup";
import signin from "@controllers/signin";
import auth from "@routes/auth";

const router = Router();

router.post(
  "/signup",
  [
    check("username", "Este campo es obligatorio").notEmpty(),
    check("email", "Este campo es obligatorio").isEmail(),
    check("password", "Este campo es obligatorio").notEmpty(),
    validateFields
  ],
  signup
);

router.post(
  "/signin",
  [
    check("username", "Este campo es obligatorio").notEmpty(),
    check("password", "Este campo es obligatorio").notEmpty(),
    validateFields
  ],
  signin
);

router.use("/auth", auth);

export default router;
