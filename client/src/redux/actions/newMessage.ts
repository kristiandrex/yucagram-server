import store from '../store';
import { Message, Chat, ActionI, State } from '../../react-app-env';
import axios from 'axios';

export default async function newMessage(message: Message): Promise<ActionI> {
    const state: State = store.getState();

    const index: number = state.chats.findIndex(chat => chat.room._id === message.room);

    if (state.current.chat !== null && state.current.chat.room._id === message.room) {
        return {
            type: 'ADD_CURRENT_MESSAGE',
            payload: {
                message,
                index
            }
        }
    }

    if (index === -1) {
        const response = await axios.post<Chat>('/chats', { user: message.from }, { headers: { Authorization: state.token } });

        const chat = response.data;
        chat.room.messages.push(message);

        return {
            type: 'ADD_CHAT',
            payload: chat
        }
    }

    return {
        type: 'ADD_MESSAGE',
        payload: { 
            message,
            index
        }
    }
}