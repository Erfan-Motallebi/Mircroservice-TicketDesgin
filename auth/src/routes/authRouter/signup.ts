import { Router, Express, Response, Request } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../../errors/databaseConnectionError";
("../../errors/databaseConnectionError");
import { RequestValidationError } from "../../errors/requestValidationError";

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(404).json({ errors: errors.array() });
      // const error = new Error("Email or Password was not correct.");
      // error["reason"] = errors.array();

      throw new RequestValidationError(errors.array());
    }
    // Testing DatabaseErrorConnection
    throw new DatabaseConnectionError();
    console.log("Creating a user");
    res.status(200).json({ situation: { msg: "signing up" } });
  }
);

export { router as signUpRouter };
