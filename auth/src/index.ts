import { app } from "./app";
import mongoose from "mongoose";

const PORT = (process.env.PORT || 3001) as number;
const HOSTNAME = (process.env.HOSTNAME || "localhost") as string;

// MongoDB and Listening Port
const startApp = async () => {
  // Checking JWT Secret Key for deployment
  if (!process.env.JWT_KEY) {
    throw new Error("JWT Token was not assigned to the Pod.");
  }
  if (!process.env.MONGO_URL) {
    throw new Error("Mongo DB URL must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv-cluster:27017/auth", {
      dbName: "auth",
      autoIndex: true,
    });
    console.log("⚒️   [ + ] [ Auth ]  Database Connected ");
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
