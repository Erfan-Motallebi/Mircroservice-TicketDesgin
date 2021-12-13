import Request from "supertest";
import { app } from "../../app";

it("should return a new ticket using /api/tickets", async () => {
  const response = await Request(app).post("/api/tickets").send({});

  expect(response.status).toEqual(200);
});
