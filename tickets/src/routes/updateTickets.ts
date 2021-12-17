import {
  authHandler,
  NotAuthorizedUser,
  NotFoundError,
} from "@emticket/common";
import express, { Router, Request, Response } from "express";
import Ticket, { ITicketDocument } from "../model/ticket.model";

const router: Router = express.Router();

router.put(
  "/api/tickets/:ticketId",
  authHandler,
  async (req: Request, res: Response) => {
    const { ticketId } = req.params;
    const ticket = (await Ticket.findById(ticketId)) as ITicketDocument;

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedUser();
    }

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
