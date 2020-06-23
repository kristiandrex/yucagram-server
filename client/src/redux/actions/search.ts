import store from '../store';
import { Chat, State } from '../../react-app-env';
import axios from 'axios';

export default async function search(value: string) {
    const state: State = store.getState();

    const initial = {
        results: {
            chats: [],
            users: []
        },
        searching: false
    };

    if (value.length === 0) {
        return {
            type: 'SET_RESULTS',
            payload: initial
        }
    }

    const chats: Chat[] = state.chats.filter(chat => chat.user.username.includes(value));
    const ignore: string[] = chats.map(chat => chat.user.username);
    ignore.push(state.user?.username as string);

    try {
        const response = await axios.post('/search/', { value, ignore }, { headers: { authorization: state.token } });

        return {
            type: 'SET_RESULTS',
            payload: {
                results: {
                    chats,
                    users: response.data
                },
                searching: true
            }
        }
    }

    catch (error) {
        console.error(error);

        return {
            type: 'SET_RESULTS',
            payload: initial
        }
    }
}