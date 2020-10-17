import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.5rem;
  align-items: center;
  color: #fff;

  .rounded-circle {
    cursor: pointer;
  }

  .avatar {
    border-radius: 50%;
    width: 47px;
    height: 47px;
  }

  .btn-options {
    cursor: pointer;
    outline: none;
  }
`;

export default function ProfileBar({ children, username, avatar, onClick }) {
  return (
    <StyledDiv className='p-2 bg-primary profile-card'>
      <div className='rounded-circle border' onClick={onClick}>
        <img className='avatar' src={avatar} alt={`Foto de ${username}`} />
      </div>
      <span className='font-weight-bold'>{username}</span>
      {children}
    </StyledDiv>
  );
}

ProfileBar.propTypes = {
  children: PropTypes.element,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onClick: PropTypes.func
};