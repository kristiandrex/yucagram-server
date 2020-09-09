import axios from 'axios';
import types from '../types';

export default function search(value) {
	return async (dispatch, getState) => {
		const state = getState();

		if (value.length === 0) {
			dispatch({ type: types.CLEAR_SEARCH });
		}

		const chats = state.chats.collection.filter(chat => chat.user.username.includes(value));
		const ignore = chats.map(chat => chat.user.username);
		ignore.push(state.auth.user?.username);

		try {
			const response = await axios.post('/api/search', { value, ignore }, {
				headers: {
					authorization: state.auth.token
				}
			});

			dispatch({
				type: types.SEARCH,
				payload: {
					chats,
					users: response.data,
					searching: true
				}
			});
		}

		catch (error) {
			console.error(error);
			dispatch({ type: types.CLEAR_SEARCH });
		}
	}
}