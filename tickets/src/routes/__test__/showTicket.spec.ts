import mongoose from "mongoose";
import Request from "supertest";
import { app } from "../../app";

describe("/app/ticket/:id", () => {
  it("should render a 404 for an unknown ticket", async () => {
    const MongooseFakeId = new mongoose.Types.ObjectId().toHexString();
    await Request(app)
      .post(`/api/tickets/${MongooseFakeId}`)
      .send()
      .expect(404);
  });
});

describe("/app/tickets/:id", () => {
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

    const ticketResp = await Request(app)
      .get(`/api/tickets/${resp.body.id}`)
      .send()
      .expect(200);

    expect(ticketResp.body.title).toEqual(title);
    expect(ticketResp.body.price).toEqual(price);
  });
});
