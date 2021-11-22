import request from "supertest";
import { app } from "../../app";

it("should return the current user after a successful signup", async () => {
  const signUpResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(201);
  // Cookie being set by the signup request handler
  const cookie = signUpResponse.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  // Checking Object Properties of the cookie being sent back as a response
  expect(response.body.currentUser).toHaveProperty("email", "test@gmail.com");
  expect(response.body.currentUser).toMatchObject({ email: "test@gmail.com" });
});

test("should return an array of error with an object [ Property: message ] ", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(401);

  console.log(response.body);
  expect(response.body.errors[0]).toHaveProperty(
    "message",
    "Not Authorized User"
  );
});
