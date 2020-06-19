import React, { memo, MouseEvent } from 'react';
import { User } from '../react-app-env';
import styled from 'styled-components';

interface Props {
  user: User;
  onClick?: (event?: MouseEvent<HTMLDivElement>) => void
}

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.5rem;
  align-items: center;
  color: #fff;

  .avatar {
    border-radius: 50%;
    width: 47px;
    height: 47px;
  }

  .btn-options {
    cursor: pointer;
  }
`;

function ProfileCard({ user, onClick }: Props) {
  return (
    <StyledDiv className='p-2 bg-primary profile-card'>
      <div className='rounded-circle border'>
        <img className="avatar" src={user.avatar} alt={`Foto de ${user.username}`}/>
      </div>
      <span className='font-weight-bold'>{user.username}</span>
      <div className='material-icons btn-options' onClick={onClick}>
        more_vert
      </div>
    </StyledDiv>
  );
};

export default memo(ProfileCard);