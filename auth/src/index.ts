import { errorHandler } from "./middlewares/errorHandler";
import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";
// ! Auth Routers [ User ]
import { currentUserRouter } from "./routes/authRouter/currentUser";
import { signInRouter } from "./routes/authRouter/signin";
import { signOutRrouter } from "./routes/authRouter/signout";
import { signUpRouter } from "./routes/authRouter/signup";
import { NotFoundError } from "./errors/notFoundError";

const app: Express = express();
const PORT = (process.env.PORT || 3000) as number;
const HOSTNAME = (process.env.HOSTNAME || "localhost") as string;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRrouter);
app.use(currentUserRouter);

// Error Handing
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});
app.use(errorHandler);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Auth Service is running on - http://${HOSTNAME}:${PORT} - `);
});
