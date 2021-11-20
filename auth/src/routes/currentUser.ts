import { Router, Response, Request } from "express";
import { sessionController } from "../middlewares/sessionController";
import { authHandler } from "../middlewares/authHandler";

const router: Router = Router();

router.get(
  "/api/users/currentuser",
  sessionController,
  authHandler,
  (req: Request, res: Response) => {
    res.status(200).json({ currentUser: req.currentUser });
  }
);

export { router as currentUserRouter };
