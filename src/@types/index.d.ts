import { Document, Types } from 'mongoose';

interface UserI extends Document {
    username: string;
    email: string;
    password: string;
    avatar: string;
    chats: ChatI[];
    role: "USER";
}

type UserType = string | UserI | Types.ObjectId;

interface ChatI extends Document {
    from: UserType;
    to: UserType
    messages: MessageI[];
    unread: number;
    role: 'CHAT';
}

interface MessageI extends Document {
    from: UserType;
    to: UserType;
    text: string;
    date: Date;
    seen: boolean
}