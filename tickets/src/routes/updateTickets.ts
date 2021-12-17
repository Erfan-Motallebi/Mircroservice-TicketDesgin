import {
  authHandler,
  NotAuthorizedUser,
  NotFoundError,
  requestValidator,
} from "@emticket/common";
import express, { Router, Request, Response } from "express";
import Ticket, { ITicketDocument } from "../model/ticket.model";
import { check } from "express-validator";

const router: Router = express.Router();

router.put(
  "/api/tickets/:ticketId",
  authHandler,
  [
    check("title").notEmpty().withMessage("Title is required").escape(),
    check("price").isFloat({ gt: 0 }),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { ticketId } = req.params;
    const { title, price } = req.body;
    const ticket = (await Ticket.findById(ticketId)) as ITicketDocument;

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedUser();
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { title, price },
      { new: true }
    );

    res.send(updatedTicket);
  }
);

export { router as updateTicketRouter };
