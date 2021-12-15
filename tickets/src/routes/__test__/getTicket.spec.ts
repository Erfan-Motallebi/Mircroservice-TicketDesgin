import Request from "supertest";
import { app } from "../../app";

interface ICreateTicket {
  title: string;
  price: number;
}

const createTicket = async ({ title, price }: ICreateTicket) => {
  return Request(app)
    .post("/api/tickets")
    .set("Cookie", global.cookieFaker())
    .send({
      title,
      price,
    });
};

describe("/api/tickets Route", () => {
  it("should return 404 when there' no route to get all tickets", async () => {
    await Request(app).get("/api/tickets").send().expect(404);
  });
});

describe("/api/tickets Route", () => {
  it("fetch All tickets all at once", async () => {
    await createTicket({ title: "Ticket 1", price: 200 });
    await createTicket({ title: "Ticket 2", price: 300 });
    await createTicket({ title: "Ticket 3", price: 400 });

    const tickets = await Request(app).get("/api/tickets").send().expect(200);

    expect(tickets.body.length).toEqual(3);
    expect(tickets.body[0].title).toEqual("Ticket 1");
    expect(tickets.body[1].title).toEqual("Ticket 2");
    expect(tickets.body[2].title).toEqual("Ticket 3");
  });
});
