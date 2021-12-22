import { Stan } from "node-nats-streaming";
import { Publisher } from "./base-publish";
import { Subjects } from "./subjects";
import { IEvent } from "./types";

export class TicketClassPublisher extends Publisher<IEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

  constructor(client: Stan) {
    super(client);
  }
}
