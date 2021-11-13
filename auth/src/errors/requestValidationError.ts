import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

// export type ErrorType = {
//   message: string,
//   field?: string
// }[]

// export interface ICustomError {
//   statusCode: number;
//   serializeError: () => ErrorType
// }

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid Request Error");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
  }
}
