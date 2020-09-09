import io from 'socket.io-client';

export default class Socket {
	static connect() {
		if (typeof Socket.instance === 'object') {
			return Socket.instance;
		}

		Socket.instance = io.connect('/', { path: '/api/socket' });

		return Socket.instance;
	}
}