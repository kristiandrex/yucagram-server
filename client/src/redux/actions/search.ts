import store from '../store';
import { Chat, State } from '../../react-app-env';
import axios from 'axios';

export default async function search(value: string) {
    const state: State = store.getState();

    if (value.length === 0) {
        return {
            type: 'CLEAR_RESULTS'
        }
    }

    const chats: Chat[] = state.chats.collection.filter(chat => chat.user.username.includes(value));
    const ignore: string[] = chats.map(chat => chat.user.username);
    ignore.push(state.user?.username as string);

    try {
        const response = await axios.post('/search/', { value, ignore }, { headers: { authorization: state.token } });

        return {
            type: 'SET_RESULTS',
            payload: {
                chats,
                users: response.data,
                searching: true
            }
        }
    }

    catch (error) {
        console.error(error);

        return {
            type: 'CLEAR_RESULTS'
        }
    }
}