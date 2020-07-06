import React, { memo, MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  onClick?: (event?: MouseEvent<HTMLDivElement>) => void;
  options?: boolean;
  children?: ReactNode;
  avatar: string;
  username: string;
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

function ProfileCard({ children, username, avatar }: Props) {

  return (
    <StyledDiv className='p-2 bg-primary profile-card'>
      <div className='rounded-circle border'>
        <img className="avatar" src={avatar} alt={`Foto de ${username}`} />
      </div>
      <span className='font-weight-bold'>{username}</span>
      {children}
    </StyledDiv>
  );
};

export default memo(ProfileCard);