import React from 'react';
import '../styles/ProfileCard.css';

export default function ProfileCard() {
  return (
    <div className="profile-card p-2 border-bottom">
      <div>
        <img src="https://placeimg.com/150/150"/>
      </div>
      <span className="font-weight-bold">username</span>
      <div className="material-icons" style={{ cursor: 'pointer' }}>more_vert</div>
    </div>
  );
}
