import React, { memo } from 'react';
import ProfileCard from './ProfileCard';
import { User, State } from '../react-app-env';
import styled from 'styled-components';
import ChatsContainer from './ChatsContainer';
import { useSelector } from 'react-redux';

const LateralSectionStyled = styled.div`
  height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-rows: 65px 55px auto;
  background: #fff;
`;

function LateralSection() {
  const user = useSelector((state: State) => state.user);

  return (
    <LateralSectionStyled className="col-3 border-right">
      <ProfileCard user={user as User} />
      <ChatsContainer />
    </LateralSectionStyled>
  );
}

export default memo(LateralSection);
