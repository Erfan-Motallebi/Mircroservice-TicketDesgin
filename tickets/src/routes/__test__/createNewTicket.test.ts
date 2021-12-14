import Request from "supertest";
import { app } from "../../app";

describe("/app/tickets Route Test", () => {
  it("should return a new ticket using /api/tickets", async () => {
    const response = await Request(app).post("/api/tickets").send({});

    expect(response.status).not.toEqual(404);
  });
});

describe("/app/tickets Route Test ", () => {
  it("Should not return statusCode [ 401 ] when the user is signed in ", async () => {
    const response = await Request(app).post("/api/tickets").send({});
    expect(response.status).not.toEqual(401);
  });
});

describe("/app/tickets Route Test", () => {
  it("should have an access to create a ticket", async () => {
    await Request(app).post("/api/tickets").send({}).expect(401);
  });
});
