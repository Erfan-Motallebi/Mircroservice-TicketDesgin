import { Message, Stan } from "node-nats-streaming";
import { IEvent, ITicketCreatedEvent } from "./types";

export abstract class Listener<K extends IEvent<ITicketCreatedEvent>> {
  protected abstract queryGroupName: string;
  protected abstract subject: K["subject"];
  protected abstract onMessage(data: K["data"], msg: Message): void;

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
        Message recieved: ${this.subject} ♨️  ${this.queryGroupName}
      `);

      const parseData = this.parseData(msg);
      this.onMessage(parseData, msg);
    });
  }

  parseData(msg: Message): K["data"] {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf-8"));
  }

  close(msg: string) {
    this.client.on("close", () => {
      console.log("💥 " + msg);
      process.exit();
    });
  }
}
