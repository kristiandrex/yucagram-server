import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import DropdownOptions from 'components/UI/DropdownOptions';
import { SocketContext } from 'components/Socket';
import { deleteChat, openChat } from 'actions/chats';
import LastMessage from './LastMessage';

const StyledChat = styled.div`
	cursor: pointer;
	display: grid;
	align-items: center;
	grid-template-areas:  "avatar username badge options" "avatar message  badge options";
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
    font-weight: bold;
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

export default function Chat({ chat, index }) {
  const hideBadge = chat.unread === 0;

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const handleOpenChat = () => dispatch(openChat(chat, index));
  const handleDelete = () => dispatch(deleteChat(chat._id, index));

  useEffect(() => {
    const handleMessageSeen = (message) => {
      if (message._to === chat.user._id) {

      }
    };

    socket.on('MESSAGE_SEEN', handleMessageSeen);
  }, [socket, chat]);

  return (
    <StyledChat className='border-bottom p-2' onClick={handleOpenChat}>
      <div className='avatar rounded-circle border'>
        <img src={chat.user.avatar} alt={`Foto de ${chat.user.username}`} />
      </div>
      <span className='username'>{chat.user.username}</span>
      <LastMessage />
      <Badge hidden={hideBadge} variant='primary'>{chat.unread}</Badge>
      <DropdownOptions>
        <Dropdown.Item onClick={handleDelete}>
          Eliminar chat
        </Dropdown.Item>
      </DropdownOptions>
    </StyledChat>
  );
}

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};