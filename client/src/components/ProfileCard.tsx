import React from 'react';
import '../styles/ProfileCard.css';
import { User } from '../react-app-env';

interface Props {
  user: User;
}

export default function ProfileCard({ user }: Props) {
  return (
    <div className='profile-card p-2 border-bottom'>
      <div className='rounded-circle border'>
        <img src={user.avatar} alt={`Foto de ${user.username}`} height='50px' width='50px' />
      </div>
      <span className='font-weight-bold'>{user.username}</span>
      <div className='material-icons' style={{ cursor: 'pointer' }}>
        more_vert
      </div>
    </div>
  );
}
