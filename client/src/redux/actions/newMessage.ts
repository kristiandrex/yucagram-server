import store from '../store';
import { Message, ActionI, State, Chat } from '../../react-app-env';
import axios from 'axios';

export default async function newMessage(message: Message): Promise<ActionI> {
    const state: State = store.getState();
    const current = state.chats.current;

    const index: number = state.chats.collection.findIndex(chat => chat.user._id === message.from);

    if (current.chat !== null && current.chat.user._id === message.from) {
        return {
            type: 'ADD_CURRENT_MESSAGE',
            payload: {
                message,
                index
            }
        }
    }

    if (index === -1) {
        const response = await axios.get<Chat>(`/chats/${message.to}/${message.from}`, {
            headers: { Authorization: state.token }
        });

        return {
            type: 'ADD_CHAT',
            payload: response.data
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