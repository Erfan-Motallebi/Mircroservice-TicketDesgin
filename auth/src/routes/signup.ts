import { Router, Response, Request } from "express";
import { body } from "express-validator";
import { User } from "../models/user.model";
import { Password } from "../service/Password";
import JWT from "jsonwebtoken";
import { BadRequestError, requestValidator } from "@emticket/common";
const router: Router = Router();

router.post(
  "/api/users/signup",
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email Field is empty. fill it please")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is not valid. ")
      .escape(),
    body("password")
      .notEmpty()
      .withMessage("Password Field is empty. fill it please")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password length is 4 - 20 characters")
      .matches(/\d/),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }
    // Library Approach
    // const user = User.build({ email, password });
    // await user.save();

    //#region Sync Approach

    const hashedPassword = await Password.toHash(password);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    //#endregion

    // Generate JWT
    const userToken = JWT.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    // Store in the req.session [Cookie on the browser-side]
    req.session = {
      jwt: userToken,
    };
    res.status(201).json(user);
  }
);

export { router as signUpRouter };
