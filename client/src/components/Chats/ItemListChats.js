import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import Badge from './Badge';
import { deleteChat, openChat } from '../../redux/actions/chats';
import CustomDropdown from '../UI/Dropdown';

const StyledItemListChats = styled.div`
	cursor: pointer;
	display: grid;
	grid-template-columns: 1fr auto auto;
	align-items: center;
	grid-template-areas:  "avatar username badge options"
						"avatar message  badge options";
	grid-template-columns: 47px 1fr auto auto;
	grid-column-gap: .5rem;
	position: relative;

	.avatar {
	grid-area: avatar;

		img {
			width: 47px;
			height: 47px;
			border-radius: 100%;
		}
	}

	.username {
		grid-area: username;
	}

	.last-message {
		grid-area: message;
	}

	.badge {
		grid-area: badge;
	}

	.dropdown {
		grid-area: options;
		cursor: pointer;
	}
`;

export default function ItemListChats({ chat, index }) {
	const dispatch = useDispatch();

	const lastMessage = useMemo(() => {
		const length = chat.messages.length;

		if (length === 0)
			return '';

		return chat.messages[length - 1].content;
	}, [chat.messages]);

	const handleClick = () => {
		dispatch(openChat(chat, index));
	};

	const handleDelete = () => {
		dispatch(deleteChat(chat._id, index))
	};

	return (
		<StyledItemListChats className='border-bottom p-2' onClick={handleClick}>
			<div className='avatar rounded-circle border'>
				<img src={chat.user.avatar} alt={`Foto de ${chat.user.username}`} />
			</div>
			<span className='username font-weight-bold'>{chat.user.username}</span>
			<span className='last-message'>{lastMessage}</span>
			<Badge count={chat.unread} show={chat.unread > 0} />
			<CustomDropdown
				id={chat._id}
				icon={'more_vert'}
				onClick={handleDelete}
			>
				Eliminar chat
			</CustomDropdown>
		</StyledItemListChats>
	);
}

ItemListChats.propTypes = {
	chat: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired
}