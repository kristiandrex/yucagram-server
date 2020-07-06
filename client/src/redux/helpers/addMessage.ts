import { Chat, Message } from "../../react-app-env";

interface Payload {
    index: number,
    message: Message
}

export default function addMessage(chats: Chat[], { index, message }: Payload) {
    const copy = chats.slice();

    if (index === 0) {
        const messages = copy[0].messages.slice();

        messages.push(message);
        copy[0].messages = messages;
    }

    else {
        const chat = copy.splice(index, 1)[0];
        const messages = chat.messages.slice();

        messages.push(message);
        chat.messages = messages;
        copy.unshift(chat);
    }

    return copy;
}