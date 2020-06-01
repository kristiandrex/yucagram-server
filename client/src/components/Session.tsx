import React from 'react';
import LateralSection from './LateralSection';
import { State } from '../react-app-env';
import CurrentUser from './CurrentUser';
import CurrentChat from './CurrentChat';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const SessionStyled = styled.main`
  height: 100vh;
  overflow: hidden;
`;

export default function Session() {
  const currentUser = useSelector((state: State) => state.current.user);
  const currentChat = useSelector((state: State) => state.current.chat);

  let current = null;

  if (currentUser !== null) {
    current = <CurrentUser />;
  }

  if (currentChat !== null) {
    current = <CurrentChat />
  }

  return (
    <SessionStyled className="row no-gutters">
      <LateralSection />
      {current}
    </SessionStyled>
  )
}