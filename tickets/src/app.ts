import express, { Express, Request, Response } from "express";
import "express-async-errors";
import {
  NotFoundError,
  errorHandler,
  sessionController,
} from "@emticket/common";
import cookieSession from "cookie-session";

// ! Tickets Routers [ User ]
import { createNewTicketRouter } from "./routes/newTicket";
import { showTicketRouter } from "./routes/showTickets";
import { getAllTicketsRouter } from "./routes/getTickets";
const app: Express = express();
app.set("trust proxy", 1);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    signed: false,
    // secure: true,
    // ! Test-driven approaches
    secure: process.env.NODE_ENV !== "test",
    name: "Micro-Kubect",
  })
);

app.use(sessionController);

// ! Ticket Routes
app.use(createNewTicketRouter);
app.use(showTicketRouter);
app.use(getAllTicketsRouter);

// Error Handing
app.use(async (req: Request, res: Response) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
