import { authHandler, NotFoundError } from "@emticket/common";
import express, { Router, Request, Response } from "express";
import Ticket from "../model/ticket.model";

const router: Router = express.Router();

router.put(
  "/api/tickets/:ticketId",
  authHandler,
  async (req: Request, res: Response) => {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }
    res.send(ticket);
  }
);

export { router as updateTicketRouter };
