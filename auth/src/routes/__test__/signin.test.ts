import request from "supertest";
import { app } from "../../app";

test("should return 400 due to non-exsisting email && password", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(400);
});

test("should return 400 due to incorrect password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@gmail.com",
      password: "test123456",
    })
    .expect(400);
});

test("should set a cookie for a successful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(201);
  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
