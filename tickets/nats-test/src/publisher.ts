import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", "efg", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Connected to the NATS - Client [ STAN ] ");

  const msg = {
    id: 123,
    title: "Publish title",
    price: 0,
  };

  stan.publish("ticket:created", JSON.stringify(msg), () => {
    console.log("Data has published.[ Ticket-Created ]");
  });
});
