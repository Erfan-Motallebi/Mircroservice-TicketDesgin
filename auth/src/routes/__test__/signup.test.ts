import request from "supertest";
import { app } from "../../app";

it("getting a 201 status when sending off the proper requests", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "eZipcoder@gmail.com",
      password: "123456",
    })
    .expect(201);
});

test("getting an error when using bad email/password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "fdfdsfdsfds@ewsdfdf", password: "123456" })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "eZipcoder@gmail.com",
      password: "p",
    })
    .expect(400);
});

