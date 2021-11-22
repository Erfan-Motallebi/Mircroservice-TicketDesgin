import request from "supertest";
import { app } from "../../app";

it("getting a 201 status when sending off the proper requests", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(201);
});

test("getting an error when using bad email/password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@ewsdfdf", password: "test123" })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "p",
    })
    .expect(400);
});

test("sets an email and stops duplicating the previous email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(400);
});

test("sets a cookie after a successful singup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
