import { Message, Stan } from "node-nats-streaming";

export abstract class Listener {
  protected abstract queryGroupName: string;
  protected abstract subject: string;
  protected abstract onMessage(data: any, msg: Message): void;

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

  parseData(msg: Message) {
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
