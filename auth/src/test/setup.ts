import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection } from "mongoose";
import { app } from "../app";

declare global {
  namespace NodeJS {
    interface Global {
      getCookie(): Promise<string[]>;
    }
  }
}

let mongoMS: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "abcd";
  mongoMS = await MongoMemoryServer.create();
  const mongoMSUri: string = mongoMS.getUri();
  await connect(mongoMSUri, {
    dbName: "Microservice-Auth",
  });
});

beforeEach(async () => {
  const collections = await connection.db.collections();
  collections.forEach((collection) => {
    collection.deleteMany({});
  });
});

afterAll(async () => {
  await mongoMS.stop();
  await connection.close();
}, 35000);

global.getCookie = async () => {
  const email = "test@gmail.com";
  const password = "test123";
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);
  const cookie = response.get("Set-Cookie");
  return cookie;
};
