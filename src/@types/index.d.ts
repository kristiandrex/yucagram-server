import { Document, Types } from 'mongoose';

interface UserI extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  chats: ChatI[];
}

interface ChatI extends Document {
  owner: Types.ObjectId;
  user: UserI | Types.ObjectId;
  messages: MessageI[];
  unread: number;
}

interface MessageI extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId;
  content: string;
  date: Date;
  seen: Boolean
}