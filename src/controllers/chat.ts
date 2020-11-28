import { Request, Response } from 'express';
import * as helpers from '../helpers/chat';
import Chat from '../models/chat'

async function getChats(req: Request, res: Response) {
    try {
        const chats = await Chat.find({ owner: res.locals.user._id });
        res.send(chats);
    }

    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function createChat(req: Request, res: Response) {
    
}

export default {
    getChats,
    createChat
}