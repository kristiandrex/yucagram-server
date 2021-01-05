import { Document, Types } from "mongoose";

interface UserI extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  chats: ChatI[] | ID[];
  role: "USER";
}

type ID = string | Types.ObjectId;

interface ChatI extends Document {
  from: ID | UserI;
  to: ID | UserI;
  messages: MessageI[];
  unread: number;
  role: "CHAT";
}

interface MessageI extends Document {
  from: ID | UserI;
  to: ID | UserI;
  text: string;
  date: Date;
  seen: boolean
}