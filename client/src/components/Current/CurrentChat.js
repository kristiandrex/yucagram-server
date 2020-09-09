import React, { useEffect, useCallback, Fragment, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListMessages from '../Messages/ListMessages';
import MessageBox from '../Messages/MessageBox';
import { SocketContext } from '../Socket';
import types from '../../redux/types';

export default function CurrentChat() {
	const user = useSelector((state) => state.auth.user);
	const current = useSelector((state) => state.chats.current.chat);
	const socket = useContext(SocketContext);
	const dispatch = useDispatch();

	const handleSendMessage = useCallback(async (value) => {
		const message = {
			content: value,
			date: new Date().toString(),
			from: user._id,
			to: current.user._id,
		};

		try {
			socket.emit('SEND_MESSAGE', message, (response) => {

				dispatch({
					type: types.ADD_CURRENT_MESSAGE,
					payload: {
						message: response,
						index: current.index
					}
				});

			});
		}
		catch (error) {
			console.error(error);
		}
	}, [current, user._id, dispatch, socket]);

	useEffect(() => {
		socket.emit('OPEN_CHAT', current._id);
	}, [current.messages, current._id, socket]);

	return (
		<Fragment>
			<ListMessages messages={current.messages} />
			<MessageBox handleSendMessage={handleSendMessage} />
		</Fragment>
	);
}
