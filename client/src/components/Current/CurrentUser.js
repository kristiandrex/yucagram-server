import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import types from '../../redux/types';

export default function CurrentUser() {
	const token = useSelector((state) => state.auth.token);
	const current = useSelector((state) => state.chats.current.user);
	const dispatch = useDispatch();

	const handleClick = async () => {
		try {
			const response = await axios.post('/api/chats', { user: current._id }, {
				headers: {
					authorization: token
				}
			});

			dispatch({ type: types.CLEAR_SEARCH });

			dispatch({
				type: types.ADD_CHAT,
				payload: response.data
			});

			dispatch({
				type: types.OPEN_CHAT,
				payload: {
					...response.data,
					index: 0
				}
			});
		}

		catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='row no-gutters current-user'>
			<div className='col-10 offset-1 align-items-center d-flex justify-content-center'>
				<div className='card text-center shadow-sm'>
					<div className='card-header bg-white'>
						<h4>¿Quieres agregar este chat?</h4>
					</div>
					<div className='card-body'>
						<button className='btn btn-primary' onClick={handleClick}>Agregar</button>
					</div>
				</div>
			</div>
		</div>
	);
}