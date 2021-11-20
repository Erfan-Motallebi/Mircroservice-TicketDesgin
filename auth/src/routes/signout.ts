import express, { Router, Express, Response, Request } from "express";

const router: Router = Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
  /**
   * @description Destroyinh a session using Null
   */
  req.session = null;
  res.status(200).json({});
});



export { router as signOutRouter };
