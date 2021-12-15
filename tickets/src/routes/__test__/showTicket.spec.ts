import Request from "supertest";
import { app } from "../../app";

describe("/app/ticket/:id", () => {
  it("should render a 404 for an unknown ticket", async () => {
    await Request(app).post("/api/tickets/ksdjbfdsbfds").send().expect(404);
  });
});
