import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection } from "mongoose";

let mongoMS: MongoMemoryServer;

beforeAll(async () => {
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
});
