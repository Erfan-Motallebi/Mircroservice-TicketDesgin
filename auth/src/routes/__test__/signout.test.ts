import request from "supertest";
import { app } from "../../app";

test("Should signout  / empty object / 200 status", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signout")
    .send()
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
  expect(response.get("Set-Cookie")[0]).toEqual(
    "Micro-Kubect=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
