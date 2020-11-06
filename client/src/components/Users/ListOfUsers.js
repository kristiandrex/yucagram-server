import React from 'react';
import { useSelector } from 'react-redux';
import User from './User';

export default function ListOfUsers() {
  const { users, searching } = useSelector((state) => state.results);

  if (!searching) {
    return null;
  }

  return (
    <div className='list-users'>
      <div className='p-2 border-bottom font-weight-bold text-center'>Usuarios</div>
      {
        users.map(user =>
          <User user={user} key={user._id} />
        )
      }
    </div>
  );
}
