import { Request, response, Response } from "express";
import Chat from "../models/chat";
import Message from "../models/message";
import helpers from "../helpers/chat";

const LIMIT_MESSAGES = 10;

async function getChat(req: Request, res: Response): Promise<void> {
  try {
    const chat = await Chat
      .findOne({ from: res.locals.user, to: req.params.user })
      .populate({ path: "to from", select: "username avatar" })
      .populate({ path: "messages", limit: 1 })
      .sort("-updatedAt");

    res.send(chat);
  }

  catch (error) {
    console.log(error);
    response.status(500);
  }
}

async function getChats(_: Request, res: Response): Promise<void> {
  try {
    const chats = await Chat
      .find({ from: res.locals.user })
      .populate({ path: "to", select: "username avatar" })
      .populate({ path: "messages" })
      .sort("-updatedAt");

    res.send(chats);
  }

  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function createChat(req: Request, res: Response): Promise<void> {
  try {
    const chat = await helpers.create(res.locals.user, req.body.user);
    res.send(chat);
  }

  catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

async function getMessages(req: Request, res: Response): Promise<void> {
  try {
    const _id = req.params._id;
    const offset = Number(req.query.offset) || 0;
    const chat = await Chat.findById(_id);

    if (!chat) {
      res.sendStatus(404);
      return;
    }

    const messages = await Message.find({ _id: chat.messages })
      .skip(offset * LIMIT_MESSAGES)
      .limit(LIMIT_MESSAGES)
      .sort({ date: -1 });

    res.send(messages);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export default {
  getChat,
  getChats,
  createChat,
  getMessages
};
