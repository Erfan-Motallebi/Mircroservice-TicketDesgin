import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {
  statusCode = 404;
  constructor(public message: string) {
    super(message);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}
