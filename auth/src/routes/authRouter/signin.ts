import { Router, Response, Request } from "express";
import { check, validationResult } from "express-validator";
import { RequestValidationError } from "../../errors/RequestValidationError";
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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    res.status(200).json({ greeting: { msg: "signing in" } });
  }
);

export { router as signInRouter };
