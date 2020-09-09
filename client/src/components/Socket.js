import React, { createContext, useEffect } from 'react';
import { element } from 'prop-types'
import { useDispatch } from 'react-redux';
import WebSocket from '../helpers/socket';
import newMessage from '../redux/actions/newMessage';

export const SocketContext = createContext(null);

export default function Socket({ children }) {
	const socket = WebSocket.connect();
	const dispatch = useDispatch();

	useEffect(() => {
		socket.on('NEW_MESSAGE', async (message) => {
			dispatch(newMessage(message));
		});
	}, [dispatch, socket]);

	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	);
}

Socket.propTypes = {
	children: element.isRequired
}