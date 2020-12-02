import io from 'socket.io';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import Message from '../models/message';
import Chat from '../models/chat';
import User from '../models/user';
import { MessageI } from '../@types';

let socket: io.Server;

function init(httpServer: Server): io.Server {
    socket = io(httpServer);
    socket.on('connection', connect);

    return socket;
}

function connect(client: io.Socket) {
    const token = client.handshake.query.token;

    try {
        const _id: string = <string>jwt.verify(token, <string>process.env.SEED);
        client.join(_id);
    }

    catch (error) {
        console.error(error);
    }

    client.on('SEND_MESSAGE', sendMessage);
    client.on('MESSAGE_SEEN', messageSeen);
}

async function sendMessage(payload: MessageI, response: (message: MessageI) => void) {
    try {
        const message = new Message(payload);
        await message.save();

        await Chat.findOneAndUpdate({ from: payload.from, to: payload.to }, { $push: { messages: message._id } });

        let chatTo = await Chat.findOneAndUpdate(
            { from: payload.to, to: payload.from },
            { $push: { messages: message._id }, $inc: { unread: 1 } }
        );

        if (!chatTo) {
            chatTo = new Chat({
                from: payload.to,
                to: payload.from,
                messages: [message._id],
                unread: 1
            });

            await chatTo.save();
            await User.findByIdAndUpdate(payload.to, { $push: { chats: chatTo._id } });
        }

        response(message);
        socket.to(<string>payload.to).emit("SEND_MESSAGE", message);
    }

    catch (error) {
        console.log(error);
        response(error);
    }
}

async function messageSeen(_id: string) {
    try {
        const message = await Message.findByIdAndUpdate(_id, { seen: true }, { select: 'from to' });

        if (message) {
            await Chat.findOneAndUpdate(
                { from: message.to, to: message.from },
                { $inc: { unread: -1 } }
            );

            socket.to(<string>message.from).emit("MESSAGE_SEEN", message);
        }
    }

    catch (error) {
        console.log(error);
    }
}

export default {
    init
}