/// <reference types="react-scripts" />
/// <reference types="react" />
/// <reference types="redux" />

import { Action, Dispatch } from "redux";

export interface User {
  _id: string;
  username: string;
  avatar: string;
  chats: Chat[];
  new: boolean;
}

export interface Chat {
  _id: string;
  user: User;
  owner: string;
  messages: Message[]
  index: number;
  unread: number;
}

export interface Message {
  _id?: string;
  from: string;
  to: string;
  content: string;
  date: string;
}

export interface Results {
  searching: boolean;
  users: User[];
  chats: Chat[];
}

export interface ChatsState {
  collection: Chat[];
  current: Current;
}

export interface State {
  chats: ChatsState;
  user: User | null;
  token: string | null;
  results: Results;
}

export interface ActionI extends Action {
  type: string;
  payload?: any;
}

export interface Current {
  chat: Chat | null;
  user: User | null;
}

export type DispatchI = Dispatch<ActionI>;

export interface ValidateI {
  error: boolean;
  message?: string;
}