import { Types, Document } from "mongoose";

export interface UserI extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  chats: ChatI[] | ID[];
  role: "USER";
}

export type ID = string | Types.ObjectId;

export interface ChatI extends Document {
  from: ID | UserI;
  to: ID | UserI;
  messages: MessageI[];
  unread: number;
  role: "CHAT";
}

export interface MessageI extends Document {
  from: ID | UserI;
  to: ID | UserI;
  text: string;
  date: Date;
  seen: boolean
}