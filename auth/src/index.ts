import { app } from "./app";
import mongoose from "mongoose";

const PORT = (process.env.PORT || 3000) as number;
const HOSTNAME = (process.env.HOSTNAME || "localhost") as string;

// MongoDB and Listening Port
const startApp = async () => {
  // Checking JWT Secret Key for deployment
  if (!process.env.JWT_KEY) {
    throw new Error("JWT Token was not assigned to the Pod.");
  }
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
