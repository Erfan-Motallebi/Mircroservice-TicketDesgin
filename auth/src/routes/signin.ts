import { Password } from "./../../service/Password";
import { Router, Response, Request } from "express";
import { check } from "express-validator";
import { BadRequestError } from "../../errors/BadRequestError";
import { requestValidator } from "../../middlewares/requestValidator";
import JWT from "jsonwebtoken";
import { User } from "../../models/user.model";

const router: Router = Router();

router.post(
  "/api/users/signin",
  [
    check("email")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Email field is empty.")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Email must be real"),
    check("password")
      .notEmpty()
      .withMessage("Password field is empty")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password length is 4 - 20 characters"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: { $eq: email } });
    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }

    const isMatchedPassword = await Password.compare(
      existingUser.password,
      password
    );
    if (!isMatchedPassword) {
      throw new BadRequestError("Password not match. please try again.");
    }

    // Generate JWT
    const userToken = JWT.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    // Store in the req.session
    req.session = { jwt: userToken };

    res.status(200).json(existingUser);
  }
);

export { router as signInRouter };
