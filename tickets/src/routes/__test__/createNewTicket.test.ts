import Request from "supertest";
import Ticket from "../../model/ticket.model";
import { app } from "../../app";

describe("/app/tickets Route Test", () => {
  it("should return a new ticket using /api/tickets", async () => {
    const response = await Request(app).post("/api/tickets").send({});

    expect(response.status).not.toEqual(404);
  });
});

describe("/app/tickets Route Test", () => {
  it("should have an access to create a ticket", async () => {
    await Request(app).post("/api/tickets").send({}).expect(401);
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

describe("/api/tickets Route", () => {
  it("Should create a new ticket", async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = "New Ticket Creating . . ";
    await Request(app)
      .post("/api/tickets")
      .set("Cookie", global.cookieFaker())
      .send({
        title,
        price: 20,
      });

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual(20);
  });
});
