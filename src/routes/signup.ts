import { Router } from "express";
import { body } from "express-validator";
import controller from "@controllers/signup";
import { fieldRequired } from "@types";
import {
  validateFields,
  checkEmail,
  checkUsername
} from "@middlewares/validate";

const router = Router();

router.post(
  "/",
  [
    body("username", fieldRequired).notEmpty().custom(checkUsername),
    body("email", fieldRequired).isEmail().custom(checkEmail),
    body("password", fieldRequired).notEmpty(),
    validateFields
  ],
  controller
);

export default router;
