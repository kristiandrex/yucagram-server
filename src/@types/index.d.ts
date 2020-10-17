import { Document, Types } from 'mongoose';

export interface UserI extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  chats: ChatI[];
  new: boolean;
}

export interface ChatI extends Document {
  owner: Types.ObjectId;
  user: UserI | Types.ObjectId;
  messages: MessageI[];
  unread: number;
}

export interface MessageI extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId;
  content: string;
  date: Date;
  seen: Boolean
}