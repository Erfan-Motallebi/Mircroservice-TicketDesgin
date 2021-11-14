import { UserDocument } from "./../../models/user.model";
import { Router, Express, Response, Request } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../../errors/BadRequestError";
import { RequestValidationError } from "../../errors/RequestValidationError";
import { User } from "../../models/user.model";
import { FilterQuery } from "mongoose";

const router: Router = Router();

router.post(
  "/api/users/signup",
  [
    body("email")
      .not()
      .isEmpty()
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is not valid. "),
    body("password")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 4, max: 15 })
      .withMessage("Password length is 4 - 12 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({
      email,
    } as FilterQuery<UserDocument>);
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({
      email,
      password,
    });
    await user.save();
    res.status(201).json(user);
  }
);

export { router as signUpRouter };
