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
    const response = await Request(app)
      .post("/api/tickets")
      .set("Cookie", global.cookieFaker())
      .send({});
    expect(response.status).not.toEqual(401);
  });
});

describe("/app/tickets Route Test", () => {
  it("should have an access to create a ticket", async () => {
    await Request(app).post("/api/tickets").send({}).expect(401);
  });
});

describe("/app/ticket Route Test", () => {
  it("should throw an error when title empty ", async () => {
    await Request(app)
      .post("/api/ticket")
      .set("Cookie", global.cookieFaker())
      .send({
        title: "",
        price: 500,
      })
      .expect(404);
  });
  it("should throw an error when title is not defined ", async () => {
    await Request(app)
      .post("/api/tickets")
      .set("Cookie", global.cookieFaker())
      .send({
        price: 500,
      })
      .expect(400);
  });
});

describe("/app/ticket Route Test", () => {
  it("should throw an error when price is negative", async () => {
    await Request(app)
      .post("/api/tickets")
      .set("Cookie", global.cookieFaker())
      .send({
        title: "New Ticket Created",
        price: -3,
      })
      .expect(400);
  });
  it("should throw an error when price is not defined", async () => {
    await Request(app)
      .post("/api/tickets")
      .set("Cookie", global.cookieFaker())
      .send({
        title: "New Ticket Created",
      })
      .expect(400);
  });
});
