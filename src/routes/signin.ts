import { Router } from "express";
import { body } from "express-validator";
import { validateFields } from "@middlewares/validate";
import { fieldRequired } from "@types";
import controller from "@controllers/signin";

const router = Router();

router.post(
  "/",
  body(["username", "password"], fieldRequired).notEmpty(),
  validateFields,
  controller
);

export default router;
