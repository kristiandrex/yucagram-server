import React, { useContext, memo } from 'react';
import { User } from '../react-app-env';
import { CurrentUserContext, CurrentChatContext } from '../context';

interface Props {
  user: User;
}

function ItemListUsers({ user }: Props) {
  const setCurrentUser = useContext(CurrentUserContext);
  const setCurrentChat = useContext(CurrentChatContext);

  const handleClick = () => {
    setCurrentUser(user);
    setCurrentChat(null);
  }

  return (
    <div
      key={user._id}
      className="border-bottom p-2 d-flex align-items-center"
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      <div className='rounded-circle border'>
        <img
          src={user.avatar}
          alt={`Foto de ${user.username}`}
          height='47px'
          width='47px'
        />
      </div>
      <span className='ml-2 font-weight-bold'>{user.username}</span>
    </div>
  );
}

export default memo(ItemListUsers);