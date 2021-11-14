import { model, Schema, Model, Document } from "mongoose";

/**
 * @interface UserAttr
 * @description It helps the User Model in the moment of being createed
 */

interface UserAttr {
  email: string;
  password: string;
}

/**
 * @interface UserModel
 * @description It helps the method of the user being detective on its own model
 */

interface UserModel extends Model<UserDocument> {
  build(attrs: UserAttr): UserDocument;
}

/**
 * @interface UserDocument
 * @description It helps the document of the user to work more efficiently
 */

interface UserDocument extends Document {
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
  { timestamps: true }
);

const User = model<UserDocument, UserModel>("User", userSchema);

userSchema.statics.build = (attrs: UserAttr) => {
  return new User(attrs);
};

export { User };
