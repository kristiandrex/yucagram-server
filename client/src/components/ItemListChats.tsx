import React, { useState, memo, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Chat, Message, ActionI, State } from '../react-app-env';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

interface Props {
  chatFromParent: Chat;
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

function ItemListChats({ chatFromParent }: Props) {
  const [count, setCount] = useState<number>(0);
  const [chat, setChat] = useState<Chat>(chatFromParent);

  const currentChat = useSelector((state: State) => state.current.chat);
  const dispatch = useDispatch<Dispatch<ActionI>>();

  const lastMessage: string = useMemo(() => {
    const messages: Message[] = chat.room.messages;
    const length: number = messages.length;

    return length > 0 ? messages[length - 1].content : '';
  }, [chat]);

  const handleClick = useCallback(() => {

    dispatch({
      type: 'SET_CURRENT_CHAT',
      payload: chatFromParent
    });

  }, [chatFromParent, dispatch]);

  useEffect(() => {

  }, [currentChat]);

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
      {count > 0 && <span className="badge badge-primary">{count}</span>}
      <div className='options material-icons' style={{ cursor: 'pointer' }}>
        more_vert
      </div>
    </ItemListChatsStyled>
  );
}

export default memo(ItemListChats);