/// <reference types="react-scripts" />
/// <reference types="react" />

import { Dispatch, SetStateAction, Context } from "react";

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
}

export interface Chat {
  _id: string;
  user: User;
  room: {
    _id: string;
    messages: Message[];
    updatedAt: Date;
  }
}

export interface Message {
  _id?: string;
  from: string;
  to: string;
  room: string;
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

export type CurrentUserCTX = Dispatch<SetStateAction<User | null>>;

export type CurrentChatCTX = Dispatch<SetStateAction<Chat | null>>;


export interface ResultsType {
  users: User[];
  chats: Chat[];
}

export type SetCurrentChatType = Dispatch<SetStateAction<CurrentChatType>>;

export type SetSearchingType = Dispatch<SetStateAction<boolean>>;

export type SetResultsType = Dispatch<SetStateAction<ResultsType>>;

export type UseTokenType = [string | null, (value: string) => void, () => void];