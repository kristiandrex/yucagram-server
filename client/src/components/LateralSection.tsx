import React, { useContext } from 'react';
import ProfileCard from './ProfileCard';
import { UserContext } from '../context';
import { User } from '../react-app-env';
import styled from 'styled-components';
import WrapperChats from './WrapperChats';

const StyledDiv = styled.div`
  height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-rows: 65px 55px auto;
  background: #fff;
`;

export default function LateralSection() {
  const { user } = useContext(UserContext);

  return (
    <StyledDiv className="col-3 border-right">
      <ProfileCard user={user as User} />
      <WrapperChats />
    </StyledDiv>
  );
}


