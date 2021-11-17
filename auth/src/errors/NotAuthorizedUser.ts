import { CustomError } from "./CustomError";

export class NotAuthorizedUser extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not Authorized");
    Object.setPrototypeOf(this, NotAuthorizedUser.prototype);
  }
  serializeError() {
    return [{ message: "Not Authorized User" }];
  }
}
