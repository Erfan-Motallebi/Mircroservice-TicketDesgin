import { Request, Response, NextFunction } from "express";
import { CustomError } from "./../errors/customError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeError() });
  }

  res.status(404).json({ errors: [{ message: "Something went wrong" }] });
};
