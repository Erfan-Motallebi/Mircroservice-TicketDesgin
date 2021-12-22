import nats from "node-nats-streaming";
import { TicketClassPublisher } from "./events/ticketCreatePublisher";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("💥 Publisher Connected!");
  const msg = {
    id: 123,
    title: "Publish title",
    price: 10,
  };
  const publisher = new TicketClassPublisher(stan);

  publisher.publish(msg);
});
