import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.post("/api/tickets", async (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as createNewTicket };
