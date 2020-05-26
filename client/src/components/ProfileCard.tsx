import React from 'react';
import { User } from '../react-app-env';
import styled from 'styled-components';

interface Props {
  user: User;
}

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.5rem;
  align-items: center;
  color: #fff;

  img {
    border-radius: 50%;
    width: 47px;
    height: 47px;
  }
`;

export default function ProfileCard({ user }: Props) {
  return (
    <StyledDiv className='p-2 bg-primary'>
      <div className='rounded-circle border'>
        <img src={user.avatar} alt={`Foto de ${user.username}`} height='47px' width='47px' />
      </div>
      <span className='font-weight-bold'>{user.username}</span>
      <div className='material-icons' style={{ cursor: 'pointer' }}>
        more_vert
      </div>
    </StyledDiv>
  );
};
