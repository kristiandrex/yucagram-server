import { Request, response, Response } from "express";
import Chat from "../models/chat"
import helpers from "../helpers/chat";

async function getChat(req: Request, res: Response): Promise<void> {
  try {
    const chat = await Chat
      .findOne({ from: res.locals.user._id, to: req.params.user })
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
      .find({ from: res.locals.user._id })
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
    const chat = await helpers.create(res.locals.user._id, req.body.user);
    res.send(chat);
  }

  catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

export default {
  getChat,
  getChats,
  createChat
}