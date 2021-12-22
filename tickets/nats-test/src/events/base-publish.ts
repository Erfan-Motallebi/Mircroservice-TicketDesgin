import { IEvent } from "./types";
import { Stan } from "node-nats-streaming";

export abstract class Publisher<K extends IEvent> {
  private client: Stan;
  protected abstract subject: K["subject"];
  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: K["data"]) {
    this.client.publish(this.subject, JSON.stringify(data), () => {});
  }
}
