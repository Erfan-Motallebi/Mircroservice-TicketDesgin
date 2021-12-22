import { Message } from "node-nats-streaming";
import { Listener } from "./base-listen";

export class TicketClassListener extends Listener {
  subject = "ticket:created";
  queryGroupName = "ticket-service";
  onMessage(data: any, msg: Message) {
    console.log("Event Data: " + data);
    // TODO: Do whatever you want on Data recieved

    msg.ack();
  }
}
