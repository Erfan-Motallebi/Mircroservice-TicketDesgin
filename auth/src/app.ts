import { errorHandler } from "./middlewares/errorHandler";
import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";

// ! Auth Routers [ User ]
import { currentUserRouter } from "./routes/currentUser";
import { signInRouter } from "./routes/signin";
import { signOutRrouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { NotFoundError } from "./errors/NotFoundError";
import cookieSession from "cookie-session";

const app: Express = express();
app.set("trust proxy", 1);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    signed: false,
    secure: true,
    name: "Micro-Kubect",
  })
);

app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRrouter);
app.use(currentUserRouter);

// Error Handing
app.use(async (req: Request, res: Response) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
