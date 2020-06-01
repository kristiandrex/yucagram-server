/// <reference types="react-scripts" />
/// <reference types="react" />

import { Dispatch, SetStateAction, Context } from "react";
import { Action } from "redux";

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

export interface ResultsType {
  users: User[];
  chats: Chat[];
}

export type SetSearchingType = Dispatch<SetStateAction<boolean>>;

export type SetResultsType = Dispatch<SetStateAction<ResultsType>>;

export type UseTokenType = [string | null, (value: string) => void, () => void];

export interface State {
  chats: Chat[];
  user: User | null;
  token: string | null;
  current: Current;
}

export interface ActionI extends Action {
  type: string;
  payload: any;
}

export interface Current {
  chat: Chat | null;
  user: User | null;
}