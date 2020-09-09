import axios from 'axios';
import Socket from '../../helpers/socket';
import types from '../types';

export function deleteChat(_id, index) {
	return async (dispatch) => {
		const token = localStorage.getItem('token');
		await axios.delete(`/api/chats/${_id}`, { headers: { Authorization: token } });

		dispatch({
			type: types.DELETE_CHAT,
			payload: index
		});
	}
}

export function openChat(chat, index) {
	const socket = Socket.connect();

	if (chat.unread > 0) {
		socket.emit('OPEN_CHAT', chat._id);
	}

	chat.index = index;

	return {
		type: types.OPEN_CHAT,
		payload: chat
	};
}