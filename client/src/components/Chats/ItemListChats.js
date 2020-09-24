import React, { useMemo } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import { deleteChat, openChat } from '../../redux/actions/chats';

const StyledItemListChats = styled.div`
	cursor: pointer;
	display: grid;
	/* grid-template-columns: 1fr auto auto; */
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

  const handleOpenChat = () => {
    dispatch(openChat(chat, index));
  };

  const handleDelete = () => {
    dispatch(deleteChat(chat._id, index));
  };

  return (
    <StyledItemListChats className='border-bottom p-2' onClick={handleOpenChat}>
      <div className='avatar rounded-circle border'>
        <img src={chat.user.avatar} alt={`Foto de ${chat.user.username}`} />
      </div>
      <span className='username font-weight-bold'>{chat.user.username}</span>
      <span className='last-message'>{lastMessage}</span>
      <Badge hidden={chat.unread === 0} variant='primary'>{chat.unread}</Badge>
      <Dropdown onClick={(event) => event.stopPropagation()}>
        <Dropdown.Toggle variant='ligth'>
          <span className='material-icons'>more_vert</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className='text-center'>
          <Dropdown.Item onClick={handleDelete}>
            Eliminar chat
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </StyledItemListChats>
  );
}

ItemListChats.propTypes = {
  chat: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};