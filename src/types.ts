import { Types, Document } from "mongoose";

export interface UserI extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  chats: ChatI[] | ID[];
  role: "USER";
}

export type ID = string | Types.ObjectId;

export interface ChatI extends Document {
  from: ID | UserI;
  to: ID | UserI;
  messages: MessageI[];
  unread: number;
  role: "CHAT";
}

export interface MessageI extends Document {
  from: ID | UserI;
  to: ID | UserI;
  text: string;
  date: Date;
  seen: boolean;
}

export const patternUsername = /^[A-Za-z0-9]+$/g;

export const fieldRequired = "Este campo es obligatorio.";
export const unavailableUsername = "Este nombre de usuario ya está registrado.";
//prettier-ignore
export const invalidUsername = "El nombre de usuario solo puede contener letras, números y guiones bajos.";
export const unavailableEmail = "Este correo ya está registrado.";
export const invalidEmail = "Este correo no es válido.";
