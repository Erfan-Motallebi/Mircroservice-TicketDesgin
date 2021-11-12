import express, { Express, Request, Response } from "express";

// ! Auth Routers [ User ]
import { currentUserRouter } from "./routes/authRouter/currentUser";
import { signInRouter } from "./routes/authRouter/signin";
import { signOutRrouter } from "./routes/authRouter/signout";
import { signUpRouter } from "./routes/authRouter/singup";

const app: Express = express();
const PORT = (process.env.PORT || 3000) as number;
const HOSTNAME = (process.env.HOSTNAME || "localhost") as string;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRrouter);
app.use(currentUserRouter);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Auth Service is running on - http://${HOSTNAME}:${PORT} - `);
});
