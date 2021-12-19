import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("ticketing", randomBytes(3).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("💥 Listener Connected!");

  const options = stan.subscriptionOptions().setManualAckMode(true);

  const subscription = stan.subscribe(
    "ticket:created",
    "payment-service-QGroup",
    options
  );

  subscription.on("message", (msg: Message) => {
    console.log("🚀 Message recieved ");
    console.log(`
    Recieved Data with Seq#: ${msg.getSequence()},
    Data: ${msg.getData()}
    `);
    msg.ack();
  });
});
