import { socket } from '../../components/Socket';
import { ActionI, Chat } from '../../react-app-env';

export default function openFunction(chat: Chat, index: number): ActionI {
    if (chat.unread > 0) {
        socket.emit('OPEN_CHAT', chat._id);
    }

    chat.index = index;

    return {
        type: 'SET_CURRENT_CHAT',
        payload: chat
    }
};