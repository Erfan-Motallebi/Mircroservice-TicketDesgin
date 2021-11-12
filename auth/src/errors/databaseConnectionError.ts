export class DatabaseConnectionError extends Error {
  reason = "Error connecting to  - DataBase - ";
  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
