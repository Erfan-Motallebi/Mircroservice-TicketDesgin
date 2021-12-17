import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection } from "mongoose";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";
declare global {
  namespace NodeJS {
    interface Global {
      cookieFaker(): string[];
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

// global.getCookie = async () => {
//   const email = "test@gmail.com";
//   const password = "test123";
//   const response = await request(app)
//     .post("/apit/users/signup")
//     .send({ email, password })
//     .expect(201);
//   const cookie = response.get("Set-Cookie");
//   return cookie;
// };

global.cookieFaker = () => {
  // TODO Faking JWT Payload
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "eZipcoder@gmail.com",
  };

  // TODO JWT SIGN
  const token = JWT.sign(payload, process.env.JWT_KEY!);

  // TODO Session Object of the token
  const session = { jwt: token };

  // TODO JSON_Stringify the token
  const sessionJSON = JSON.stringify(session);

  // TODO BASE64 of the sessionJSON
  const base46OfSession = Buffer.from(sessionJSON).toString("base64");

  return [`Micro-Kubect=${base46OfSession}`];
};
