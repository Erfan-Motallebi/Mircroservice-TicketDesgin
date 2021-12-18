import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", "efg", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Connected to the NATS - Client [ STAN ] ");
});
