import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("ticketing", randomBytes(3).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("💥 Listener Connected!");

  const subscription = stan.subscribe(
    "ticket:created",
    "payment-service-QGroup"
  );

  subscription.on("message", (msg: Message) => {
    console.log("🚀 Message recieved ");
    console.log(`
    Recieved Data with Seq#: ${msg.getSequence()},
    Data: ${msg.getData()}
    `);
  });
});
