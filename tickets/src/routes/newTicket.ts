import { authHandler } from "@emticket/common";
import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.post(
  "/api/tickets",
  authHandler,
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export { router as createNewTicket };
