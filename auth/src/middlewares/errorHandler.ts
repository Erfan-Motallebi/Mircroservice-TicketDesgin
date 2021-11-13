import { Request, Response, NextFunction } from "express";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";
import { RequestValidationError } from "./../errors/requestValidationError";
import { CustomError } from "./../errors/customError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).json({ errors: err.serializeError() });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).json({ errors: err.serializeError() });
  }

  res
    .status(new CustomError().statusCode)
    .json({ errors: new CustomError().serializeError() });
};
