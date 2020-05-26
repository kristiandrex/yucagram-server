import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Chat, User } from '../react-app-env';
import { CurrentChatContext, CurrentUserContext } from '../context';

interface Props {
  chat: Chat;
}

const StyledDiv = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
`;

export default function ItemListChats({ chat }: Props) {
  const [count, setCount] = useState<number>(0);
  const user: User = chat.user;

  const setCurrentChat = useContext(CurrentChatContext);
  const setCurrentUser = useContext(CurrentUserContext);

  const handleClick = () => {
    setCurrentChat(chat);
    setCurrentUser(null);
  };

  return (
    <StyledDiv
      className="border-bottom p-2"
      onClick={handleClick}
    >
      <div className="d-flex align-items-center">
        <div className='rounded-circle border'>
          <img src={user.avatar} alt={`Foto de ${user.username}`} height='47px' width='47px' />
        </div>
        <span className='ml-2 font-weight-bold'>{user.username}</span>
      </div>
      {count > 0 && <span className="badge badge-primary mr-2">{count}</span>}
      <div className='material-icons' style={{ cursor: 'pointer' }}>
        more_vert
      </div>
    </StyledDiv>
  );
}
