import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import types from 'types';

function User({ user }) {
  const dispatch = useDispatch();

  const handleClick = () => dispatch({
    type: types.OPEN_CHAT,
    payload: {
      user,
      messages: [],
      _id: null,
      index: -1
    }
  });

  return (
    <div
      key={user._id}
      className='border-bottom p-2 d-flex align-items-center'
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      <div className='rounded-circle border'>
        <img
          src={user.avatar}
          alt={`Foto de ${user.username}`}
          height='47px'
          width='47px'
          className='rounded-circle'
        />
      </div>
      <span className='ml-2 font-weight-bold'>{user.username}</span>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default memo(User);