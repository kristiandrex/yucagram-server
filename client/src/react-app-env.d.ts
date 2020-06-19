/// <reference types="react-scripts" />
/// <reference types="react" />

import { Action, Dispatch } from "redux";

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
  room: Room;
  index: number;
  unread: number;
}

export interface Room {
  _id: string;
  messages: Message[];
  updatedAt: Date;
}

export interface Message {
  _id?: string;
  from: string;
  to: string;
  room: string;
  content: string;
  date: string;
}

export interface ResultsType {
  users: User[];
  chats: Chat[];
}

export interface State {
  chats: Chat[];
  user: User | null;
  token: string | null;
  current: Current;
  results: ResultsType;
  searching: boolean;
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