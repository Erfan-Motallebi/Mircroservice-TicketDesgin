import { errorHandler } from "./middlewares/errorHandler";
import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";
import mongoose from "mongoose";
// ! Auth Routers [ User ]
import { currentUserRouter } from "./routes/authRouter/currentUser";
import { signInRouter } from "./routes/authRouter/signin";
import { signOutRrouter } from "./routes/authRouter/signout";
import { signUpRouter } from "./routes/authRouter/signup";
import { NotFoundError } from "./errors/NotFoundError";
import cookieSession from "cookie-session";

const PORT = (process.env.PORT || 3000) as number;
const HOSTNAME = (process.env.HOSTNAME || "localhost") as string;

const app: Express = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    signed: false,
    secure: true,
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

// MongoDB and Listening Port
const startApp = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv-cluster:27017", {
      dbName: "auth",
      autoIndex: true,
    });
    console.log("⚒️   [ + ]  Database Connected ");
  } catch (error) {
    console.error(error);
  }
  app.listen(PORT, HOSTNAME, () => {
    console.log(
      `⚒️   [ + ]  Auth Service is running on - http://${HOSTNAME}:${PORT} - `
    );
  });
};

startApp();
