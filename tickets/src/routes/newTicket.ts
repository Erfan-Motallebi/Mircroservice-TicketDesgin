import {
  authHandler,
  requestValidator,
  sessionController,
} from "@emticket/common";
import express, { Request, Response, Router } from "express";
import { body } from "express-validator";
import Ticket from "../model/ticket.model";

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
    const { title, price } = req.body;
    const newTicket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await newTicket.save();

    res.status(201).json(newTicket);
  }
);

export { router as createNewTicket };
