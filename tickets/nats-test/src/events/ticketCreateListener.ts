import { Message } from "node-nats-streaming";
import { Listener } from "./base-listen";
import { Subjects } from "./subjects";

interface ITicketCreated {
  id: number;
  title: string;
  price: number;
}

export class TicketClassListener extends Listener<ITicketCreated, Subjects> {
  subject = Subjects.TicketCreated;
  queryGroupName = "ticket-service";
  onMessage(data: ITicketCreated, msg: Message) {
    console.log("Event Data: " + data);
    // TODO: Do whatever you want on Data recieved
    msg.ack();
  }
}
