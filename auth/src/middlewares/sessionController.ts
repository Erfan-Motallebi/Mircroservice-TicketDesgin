import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

interface IJwtPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IJwtPayload;
    }
  }
}

export const sessionController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const authenticatedUser = JWT.verify(
      req.session!.jwt,
      process.env.JWT_KEY!
    ) as IJwtPayload;
    req.currentUser = authenticatedUser;
  } catch (error) {
    console.error(error);
  }
  next();
};
