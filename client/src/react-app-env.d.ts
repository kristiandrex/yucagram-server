/// <reference types="react-scripts" />
/// <reference types="react" />

import { Dispatch, SetStateAction } from "react";

export interface AlertProps {
  message: string;
  type: string;
  onClose: Function;
}

export interface User {
  _id: string;
  username: string;
  avatar: string;
  chats: Chat[];
  socket: string | null;
}

export interface Chat {
  _id: string;
  user: User;
  room: {
    messages: Message[];
    lastModified: string;
  }
}

export interface Message {
  _id: string;
  from: string;
  to: string;
  content: string;
  date: Date;
}

export interface UserCTX {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export interface TokenCTX {
  token: string | null;
  setToken: (value: string) => void;
  removeToken: () => void; 
}

export interface CurrentChatType {
  user: User | null;
  chat: Chat | null;
}

export interface ResultsType {
  users: User[];
  chats: Chat[];
}

export type setCurrentChatType = Dispatch<SetStateAction<CurrentChatType>>;

export type setSearchingType = Dispatch<SetStateAction<boolean>>;

export type setResultsType = Dispatch<SetStateAction<ResultsType>>;
