import mongoose from "mongoose";
import Request from "supertest";
import { app } from "../../app";

describe("/api/tickets/:id [ PUT Request ] ", () => {
  it("should return ", async () => {
    const mongooseFakeId = new mongoose.Types.ObjectId().toHexString();
    await Request(app)
      .put("/api/tickets/" + mongooseFakeId)
      .set("Cookie", global.cookieFaker())
      .send({
        title: "Title Test",
        price: 520,
      })
      .expect(404);
  });
});

describe("/api/tickets/:id [ PUT Request ] ", () => {
  it("should return 401 for unauthorized user", async () => {
    const mongooseFakeId = new mongoose.Types.ObjectId().toHexString();
    await Request(app)
      .put("/api/tickets/" + mongooseFakeId)
      .send({
        title: "Tite Test",
        price: 522,
      })
      .expect(401);
  });
});

describe("/api/tickets/:id [ PUT Request ] ", () => {
  it("should return 401 if the user is not the owner of the ticket", async () => {
    const response = await Request(app)
      .post(`/api/tickets`)
      .set("Cookie", global.cookieFaker())
      .send({ title: "Title", price: 500 })
      .expect(201);

    await Request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", global.cookieFaker())
      .send({ title: "Title Updated", price: 500 })
      .expect(401);
  });
});

describe("/api/tickets/:id [ PUT Request ] ", () => {
  it("should update the ticket an get the result", async () => {
    const cookie = global.cookieFaker();
    const response = await Request(app)
      .post(`/api/tickets`)
      .set("Cookie", cookie)
      .send({ title: "Title", price: 500 })
      .expect(201);

    const updateTickeResp = await Request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({ title: "Title Updated", price: 510 })
      .expect(200);

    expect(updateTickeResp.body.title).toEqual("Title Updated");
    expect(updateTickeResp.body.price).toEqual(510);
  });
});
