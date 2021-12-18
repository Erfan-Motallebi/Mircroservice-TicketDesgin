import nats, { Message } from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing", "efg", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("💥 Listener Connected!");

  const subscription = stan.subscribe("ticket:created");

  subscription.on("message", (msg: Message) => {
    console.log("🚀 Message recieved ");
    console.log(`
    Recieved Data with Seq#: ${msg.getSequence()},
    Data: ${msg.getData()}
    `);
  });
});
