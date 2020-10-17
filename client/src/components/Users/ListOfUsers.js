import React from 'react';
import User from './User';
import PropTypes from 'prop-types';

export default function ListOfUsers({ users }) {
  return (
    <div className='list-users'>
      <div className='p-2 border-bottom font-weight-bold text-center'>Usuarios</div>
      {users.map(user => <User user={user} key={user._id} />)}
    </div>
  );
}

ListOfUsers.propTypes = {
  users: PropTypes.array.isRequired
};