import React, { useMemo, MouseEvent, useCallback } from 'react';
import styled from 'styled-components';
import { Chat, DispatchI } from '../react-app-env';
import { useDispatch } from 'react-redux';
import deleteChat from '../redux/actions/deleteChat';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import openChat from '../redux/actions/openChat';

interface Props {
  chat: Chat;
  index: number;
}

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

export default function ItemListChats({ chat, index }: Props) {
  const dispatch = useDispatch<DispatchI>();

  const lastMessage = useMemo<string>(() => {
    const length = chat.messages.length;

    if (length === 0)
      return '';

    return chat.messages[length - 1].content;
  }, [chat.messages]);

  const handleClick = useCallback(() => {
    dispatch(openChat(chat, index));
  }, [chat, dispatch, index]);

  const handleDelete = () => {
    deleteChat(chat._id, index)
      .then(action => dispatch(action))
      .catch(error => console.error(error));
  };

  return (
    <StyledItemListChats
      className="border-bottom p-2"
      onClick={handleClick}
    >
      <div className='avatar rounded-circle border'>
        <img
          src={chat.user.avatar}
          alt={`Foto de ${chat.user.username}`}
        />
      </div>
      <span className='username font-weight-bold'>{chat.user.username}</span>
      <span className="last-message">{lastMessage}</span>
      {chat.unread > 0 && <span className="badge badge-primary">{chat.unread}</span>}
      <DropdownButton 
        id={chat._id} 
        title={<span className="material-icons">more_vert</span>}
        onClick={(event: MouseEvent) => event?.stopPropagation()}
        variant="link"
      >
        <Dropdown.Item 
          onClick={handleDelete} 
          className="text-center"
        >
          Eliminar chat
        </Dropdown.Item>
      </DropdownButton>
    </StyledItemListChats>
  );
}