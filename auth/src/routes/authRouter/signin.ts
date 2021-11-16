import { Router, Response, Request } from "express";
import { check } from "express-validator";
import { requestValidator } from "../../middlewares/requestValidator";
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
    res.status(200).json({ greeting: { msg: "signing in" } });
  }
);

export { router as signInRouter };
