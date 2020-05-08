/// <reference types="react-scripts" />
/// <reference types="react" />

interface AlertProps {
  message: string;
  type: string;
  onClose: Function;
}

interface User {
  _id: string;
  username: string;
  avatar: string;
  chats: Chat[];
}

interface Chat {
  _id: string;
  user: User;
  room: {
    messages: Message[];
  }
}

interface Message {
  _id: string;
  from: string;
  to: string;
  content: string;
  file: boolean;
  url: string;
  date: Date;
}

interface UserCTX {
  user: User | undefined;
  setUser: Function;
}

interface TokenCTX {
  token: any;
  setToken: Function;
}

interface Current {
  chat: Chat | null;
  exists: boolean;
}