import express, { Router, Express, Response, Request } from "express";

const router: Router = Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
  res.status(200).json({ greeting: { msg: "Current User" } });
});

export { router as signOutRrouter };
