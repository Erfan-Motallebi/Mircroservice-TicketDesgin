import { Request, Response, NextFunction } from "express";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";
import { RequestValidationError } from "./../errors/requestValidationError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const requestError = err.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
    return res.status(404).json({ errors: requestError });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).json({ errors: [{ message: err.reason }] });
  }

  res.status(404).json({ errors: [{ message: "Something went wrong" }] });
};
