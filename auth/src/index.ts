import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT = (process.env.PORT || 3000) as number;
const HOSTNAME = (process.env.HOSTNAME || "localhost") as string;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/users/currentuser", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ greeting: { msg: "Hello - Welcome to my ticket app" } });
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Auth Service is running on - http://${HOSTNAME}:${PORT} - `);
});
