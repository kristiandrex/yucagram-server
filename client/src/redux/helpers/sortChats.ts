import { Chat, Message } from "../../react-app-env";

export default function sortChats(chats: Chat[], index: number, message: Message) {
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