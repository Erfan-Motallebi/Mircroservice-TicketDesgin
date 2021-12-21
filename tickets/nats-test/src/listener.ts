import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("ticketing", randomBytes(3).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("💥 Listener Connected!");

  stan.on("close", () => {
    console.log("Listener is GONE!");
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("order-service");

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

process.on("SIGINT", () => {
  stan.close();
});

process.on("SIGTERM", () => {
  stan.close();
});

abstract class Listener {
  abstract queryGroupName: string;
  abstract subject: string;
  abstract onMessage(data: any, msg: Message): void;

  private client: Stan;
  protected ackWait: number = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDeliverAllAvailable()
      .setDurableName(this.queryGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queryGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`
        Message recieved: ${this.subject} ♨️ ${this.queryGroupName}
      `);

      const parseData = this.parseData(msg);
      this.onMessage(parseData, msg);
    });
  }

  parseData(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf-8"));
  }
}
