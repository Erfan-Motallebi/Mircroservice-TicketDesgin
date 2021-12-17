import { Document, Model, model, Schema } from "mongoose";

interface ITicketAttr {
  title: string;
  price: number;
  userId: string;
}

export interface ITicketDocument extends Document {
  title: string;
  price: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ITicketModel extends Model<ITicketDocument> {
  build: (attr: ITicketAttr) => ITicketDocument;
}

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    versionKey: false,
  }
);

ticketSchema.statics.build = (attr: ITicketAttr) => {
  return new Ticket(attr);
};

const Ticket = model<ITicketDocument, ITicketModel>("Ticket", ticketSchema);

export default Ticket;
