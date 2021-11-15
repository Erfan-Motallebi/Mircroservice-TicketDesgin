import { Router, Response, Request } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../../errors/BadRequestError";
import { RequestValidationError } from "../../errors/RequestValidationError";
import { User } from "../../models/user.model";
import { Password } from "../../service/Password";
import JWT from "jsonwebtoken";

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
      .withMessage("Email is not valid. "),
    body("password")
      .notEmpty()
      .withMessage("Password Field is empty. fill it please")
      .trim()
      .isLength({ min: 4, max: 12 })
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
    });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }
    // // Library Approach
    // const user = User.build({ email, password });
    // await user.save();

    // Sync Approach
    const hashedPassword = await Password.toHash(password);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Generate JWT
    const userToken = JWT.sign({ id: user.id, email: user.email }, "abcdef");

    // Store in the req.session
    req.session = { jwt: userToken };

    res.status(201).json(user);
  }
);

export { router as signUpRouter };
