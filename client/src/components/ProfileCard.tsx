import React, { memo, MouseEvent, ReactNode } from 'react';
import { User } from '../react-app-env';
import styled from 'styled-components';

interface Props {
  user: User;
  onClick?: (event?: MouseEvent<HTMLDivElement>) => void;
  options?: boolean;
  children?: ReactNode;
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
    outline: none;
  }
`;

function ProfileCard({ user, children }: Props) {

  return (
    <StyledDiv className='p-2 bg-primary profile-card'>
      <div className='rounded-circle border'>
        <img className="avatar" src={user.avatar} alt={`Foto de ${user.username}`} />
      </div>
      <span className='font-weight-bold'>{user.username}</span>
      {children}
    </StyledDiv>
  );
};

export default memo(ProfileCard);