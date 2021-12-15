import { model, Schema, Model, Document } from "mongoose";
import { Password } from "../service/Password";
/**
 * @interface UserAttrs
 * @description It helps the User Model in the moment of being createed
 */

interface IUserAttrs {
  email: string;
  password: string;
}

/**
 * @interface UserModel
 * @description It helps the method of the user being detective on its own model
 */

interface IUserModel extends Model<IUserDocument> {
  build(attrs: IUserAttrs): IUserDocument;
}

/**
 * @interface UserDocument
 * @description It helps the document of the user to work more efficiently
 */

export interface IUserDocument extends Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
      },
    },
    versionKey: false,
  }
);

const User = model<IUserDocument, IUserModel>("User", userSchema);

/**
 * @function build
 * @param {email: string, password: string}
 * @returns IUserDocument
 */

userSchema.static("build", function (attrs: IUserAttrs) {
  return new User(attrs);
});

userSchema.pre<IUserDocument>(
  "save",
  async function (this: IUserDocument, next): Promise<void> {
    console.log("Saving . . . ");
    // const self = this as UserDocument;
    if (this.isModified("password")) {
      const hashedPassword = await Password.toHash(this.get("password"));
      this.set("password", hashedPassword);
    }
    next();
  }
);

export { User };
