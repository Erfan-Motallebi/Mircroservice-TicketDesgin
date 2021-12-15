import express, { Router, Response, Request } from "express";
import Ticket from "../model/ticket.model";

const router: Router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});
  res.status(200).json(tickets);
});

export { router as getAllTicketsRouter };
