import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledMessageBox = styled.div`
	height: 60px;

	form {
		height: 100%;
	}
`;

export default function MessageBox({ handleSendMessage }) {
	const [value, setValue] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		if (value.trim().length === 0) {
			return;
		}

		handleSendMessage(value);
		setValue('');
	};

	const handleChange = useCallback((event) => {
		setValue(event.target.value);
	}, []);

	return (
		<StyledMessageBox className='messages-box p-2 border-top'>
			<form className='d-flex align-items-center' onSubmit={handleSubmit}>
				<input
					type='text'
					className='form-control'
					placeholder='Escribe un mensaje'
					value={value}
					onChange={handleChange}
				/>
				<button
					type='submit'
					className='btn btn-outline-primary ml-2'
				>
					<i className='material-icons'>send</i>
				</button>
			</form>
		</StyledMessageBox>
	);
}

MessageBox.propTypes = {
	handleSendMessage: PropTypes.func.isRequired
}