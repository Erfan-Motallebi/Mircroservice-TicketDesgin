export class CustomError extends Error {
  statusCode = 404;
  constructor() {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  serializeError() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
