import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketClassListener } from "./events/ticketCreateListener";

console.clear();

const stan = nats.connect("ticketing", randomBytes(3).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("💥 Listener Connected!");

  const ticketClassListener = new TicketClassListener(stan);

  ticketClassListener.close("Successfully Closed the Listener");
  ticketClassListener.listen();
});

process.on("SIGINT", () => {
  stan.close();
});

process.on("SIGTERM", () => {
  stan.close();
});
