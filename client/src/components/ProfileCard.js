import React from 'react';
import '../styles/ProfileCard.css';

export default function ProfileCard(props) {
  return (
    <div className='profile-card p-2 border-bottom'>
      <div className='rounded-circle border'>
        <img src={props.avatar} alt={props.alt} />
      </div>
      <span className='font-weight-bold'>username</span>
      <div className='material-icons' style={{ cursor: 'pointer' }}>
        more_vert
      </div>
    </div>
  );
}
