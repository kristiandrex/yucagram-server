import axios from 'axios';
import types from '../types';
import Socket from '../../helpers/socket';

export function verifyAuth() {
	const token = localStorage.getItem('token');

	return async (dispatch) => {
		if (token === null) {
			dispatch(signout());
		}

		else {
			try {
				const response = await axios.get('/api/signin/token', { headers: { authorization: token } });
				dispatch(signin(response.data, token));

				const socket = Socket.connect();
				socket.emit('SIGNIN', token);
			}

			catch (error) {
				dispatch(signout());
				console.warn(error);
			}
		}
	}
}

export function signin(user, token) {
	localStorage.setItem('token', token);

	return {
		type: types.SIGNIN,
		payload: {
			user,
			token
		}
	}
}

export function signout() {
	localStorage.removeItem('token');

	return {
		type: types.SIGNOUT
	}
}