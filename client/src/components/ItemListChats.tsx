import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Chat, DispatchI } from '../react-app-env';
import { useDispatch } from 'react-redux';
import { socket } from './Socket';

interface Props {
  chat: Chat;
  index: number;
}

const ItemListChatsStyled = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  grid-template-areas:  "avatar username badge options"
                        "avatar message  badge options";
  grid-template-columns: 47px 1fr auto auto;
  grid-column-gap: .5rem;
  
  .avatar {
    grid-area: avatar;
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

  .options {
    grid-area: options;
  }
`;

export default function ItemListChats({ chat, index }: Props) {
  const lastMessage = useMemo<string>(() => {
    const length = chat.room.messages.length;

    if (length === 0)
      return '';

    return chat.room.messages[length - 1].content;
  }, [chat.room.messages]);

  const dispatch = useDispatch<DispatchI>();

  const handleClick = () => {
    if (chat.unread > 0) {
      socket.emit('OPEN_CHAT', chat._id);
    }

    dispatch({
      type: 'SET_CURRENT_CHAT',
      payload: {
        ...chat, index
      }
    });
  };

  return (
    <ItemListChatsStyled
      className="border-bottom p-2"
      onClick={handleClick}
    >
      <div className='avatar rounded-circle border'>
        <img src={chat.user.avatar} alt={`Foto de ${chat.user.username}`} height='47px' width='47px' />
      </div>
      <span className='username font-weight-bold'>{chat.user.username}</span>
      <span className="last-message">{lastMessage}</span>
      {chat.unread > 0 && <span className="badge badge-primary">{chat.unread}</span>}
      <div className='options material-icons' style={{ cursor: 'pointer' }}>
        more_vert
      </div>
    </ItemListChatsStyled>
  );
}