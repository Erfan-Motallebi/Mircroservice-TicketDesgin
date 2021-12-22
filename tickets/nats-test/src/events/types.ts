import { Subjects } from "./subjects";

export interface ITicketCreatedEvent {
  data: {
    id: number;
    title: string;
    price: number;
  };
}

// export interface IOrderedCreatedEvent {
//   subject: Subjects;
//   data: {
//     id: number;
//     title: string;
//     price: string;
//   };
// }

export interface IEvent<T> {
  subject: Subjects;
  data: T;
}
