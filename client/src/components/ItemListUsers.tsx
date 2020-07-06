import React, { memo, useCallback } from 'react';
import { User, ActionI } from '../react-app-env';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

interface Props {
  user: User;
}

function ItemListUsers({ user }: Props) {
  const dispatch = useDispatch<Dispatch<ActionI>>();

  const handleClick = useCallback(() => {
    dispatch({
      type: 'SET_CURRENT_USER',
      payload: user
    });
  }, [dispatch, user]);

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
          className="rounded-circle"
        />
      </div>
      <span className='ml-2 font-weight-bold'>{user.username}</span>
    </div>
  );
}

export default memo(ItemListUsers);