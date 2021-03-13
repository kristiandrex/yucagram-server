import { model, Schema, Types } from "mongoose";
import { ChatI } from "@types";

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
  messages: [{
    type: Types.ObjectId,
    ref: "Message",
    required: true
  }],
  unread: {
    type: Number,
    default: 0,
    min: 0
  },
  role: {
    type: String,
    default: "CHAT",
    immutable: true
  }
}, { timestamps: true });

export default model<ChatI>("Chat", schema);