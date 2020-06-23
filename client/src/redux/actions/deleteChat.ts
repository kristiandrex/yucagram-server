import store from '../store';
import { ActionI } from '../../react-app-env';
import axios from 'axios';

export default async function deleteChat(_id: string | undefined, index: number| undefined): Promise<ActionI> {
    const token = store.getState().token;

    await axios.delete(`/chats/${_id}`, { headers: { Authorization: token } });

    return {
        type: 'DELETE_CHAT',
        payload: index
    }
}