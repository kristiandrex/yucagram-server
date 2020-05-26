import { Document, Types } from 'mongoose';

export interface UserI extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  chats: ChatI[];
}

export interface ChatI extends Document {
  user: {
    _id: Types.ObjectId;
    username: string;
    avatar: string;
  },
  room: {
    _id: Types.ObjectId;
    updatedAt: Date;
    messages: MessageI[]
  }
}

export interface MessageI extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId,
  content: string,
  date: Date,
  room: Types.ObjectId
}