import { Schema, model, Types } from "mongoose";
import { MessageI } from "@types";

const schema = new Schema({
  from: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  to: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  seen: {
    type: Boolean,
    default: false
  }
});

const Message = model<MessageI>("Message", schema);

export default Message;
