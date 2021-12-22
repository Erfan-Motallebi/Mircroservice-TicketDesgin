import { Message } from "node-nats-streaming";
import { Listener } from "./base-listen";
import { Subjects } from "./subjects";
import { IEvent, ITicketCreatedEvent } from "./types";

// interface ITicketCreated {
//   id: number;
//   title: string;
//   price: number;
// }

export class TicketClassListener extends Listener<IEvent<ITicketCreatedEvent>> {
  subject: Subjects = Subjects.TicketCreated;
  queryGroupName = "ticket-service";
  onMessage(data: ITicketCreatedEvent, msg: Message) {
    console.log("Event Data: " + data);
    // TODO: Do whatever you want on Data recieved
    msg.ack();
  }
}
