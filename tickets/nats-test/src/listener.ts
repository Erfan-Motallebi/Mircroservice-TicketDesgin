import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing", "efg", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("💥 Listener Connected!");

  const subscription = stan.subscribe("ticket:created");

  subscription.on("message", (msg) => {
    console.log("🚀 Message recieved ");
  });
});
