import { NotFoundError } from "./../../../common/src/errors/NotFoundError";
import express, { Router, Request, Response } from "express";
import Ticket from "../model/ticket.model";

const router: Router = express.Router();

router.get("/api/tickets/:ticketId", async (req: Request, res: Response) => {
  const { ticketId } = req.params;
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(200).json(ticket);
});

export { router as showTicketRouter };
