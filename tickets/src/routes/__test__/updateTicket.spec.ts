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
