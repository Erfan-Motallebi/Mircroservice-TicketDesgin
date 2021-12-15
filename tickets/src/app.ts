import express, { Express, Request, Response } from "express";
import "express-async-errors";
import {
  NotFoundError,
  errorHandler,
  sessionController,
} from "@emticket/common";
import cookieSession from "cookie-session";

// ! Tickets Routers [ User ]
import { createNewTicket } from "./routes/newTicket";
import { showTicketRouter } from "./routes/showTickets";
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
app.use(createNewTicket);
app.use(showTicketRouter);

// Error Handing
app.use(async (req: Request, res: Response) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
