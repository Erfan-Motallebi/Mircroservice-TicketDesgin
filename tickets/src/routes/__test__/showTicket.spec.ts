import Request from "supertest";
import { app } from "../../app";

describe("/app/ticket/:id", () => {
  it("should render a 404 for an unknown ticket", async () => {
    await Request(app).post("/api/tickets/ksdjbfdsbfds").send().expect(404);
  });
});

describe("app/tickets/:id", () => {
  it("should return a new ticket if there is", async () => {
    let title = "Dubai Concert";
    let price = 540;
    const resp = await Request(app)
      .post("/api/tickets")
      .set("Cookie", global.cookieFaker())
      .send({
        title,
        price,
      })
      .expect(201);

    await Request(app).get(`/api/tickets/${resp.body.id}`).send().expect(200);
  });
});
