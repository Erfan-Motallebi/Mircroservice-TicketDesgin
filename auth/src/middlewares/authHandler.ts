import { NextFunction, Request, Response } from "express";
import { NotAuthorizedUser } from "../errors/NotAuthorizedUser";

export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    throw new NotAuthorizedUser();
  }
  next();
};
