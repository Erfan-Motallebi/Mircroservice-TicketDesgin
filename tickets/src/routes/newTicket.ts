import { authHandler, requestValidator } from "@emticket/common";
import express, { Request, Response, Router } from "express";
import { body } from "express-validator";

const router: Router = express.Router();

router.post(
  "/api/tickets",
  authHandler,
  [
    body("title")
      .notEmpty()
      .withMessage("Title is empty.")
      .exists({ checkNull: false })
      .withMessage("Title is not defined"),
    body("price").isFloat({ gt: 0 }),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export { router as createNewTicket };
