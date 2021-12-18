import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("💥 Publisher Connected!");

  const msg = {
    id: 123,
    title: "Publish title",
    price: 0,
  };

  stan.publish("ticket:created", JSON.stringify(msg), () => {
    console.log("🚀 Publish Event");
  });
});
