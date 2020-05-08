import React from 'react';
import '../styles/ProfileCard.css';

interface Props {
  avatar: string;
  alt: string;
  username: string;
}

export default function ProfileCard(props: Props) {
  return (
    <div className='profile-card p-2 border-bottom'>
      <div className='rounded-circle border'>
        <img src={props.avatar} alt={props.alt} height='50px' width='50px' />
      </div>
      <span className='font-weight-bold'>{props.username}</span>
      <div className='material-icons' style={{ cursor: 'pointer' }}>
        more_vert
      </div>
    </div>
  );
}
