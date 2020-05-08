import { Document, Types } from 'mongoose';

export interface UserI extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  chats?: [Types.ObjectId];
  _id: Types.ObjectId;
}

export interface ChatI extends Document {
  _id: Types.ObjectId;
  messages: [string]
}
