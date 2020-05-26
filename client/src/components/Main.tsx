import React, { useContext, useEffect, useState } from 'react';
import { TokenContext, CurrentUserContext, SocketContext, CurrentChatContext } from '../context'
import LateralSection from './LateralSection';
import { User, Chat } from '../react-app-env';
import CurrentUser from './CurrentUser';
import CurrentChat from './CurrentChat';
import styled from 'styled-components';

const MainStyled = styled.main`
  height: 100vh;
  overflow: hidden;
`;

export default function Main() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const { token } = useContext(TokenContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket?.emit('signin', token);

    socket?.on('reloadChats', () => {
      console.log(':D');
    });

    socket?.on('sendMessage', (data: any) => {
      console.log(data);
    });
  }, [token, socket]);

  let currentSection = null;

  if (currentUser !== null) {
    currentSection = (
      <CurrentUser
        currentUser={currentUser}
        setCurrentChat={setCurrentChat}
      />
    );
  }

  if (currentChat !== null) {
    currentSection = <CurrentChat currentChat={currentChat} />
  }

  return (
    <CurrentChatContext.Provider value={setCurrentChat}>
      <CurrentUserContext.Provider value={setCurrentUser}>
        <MainStyled className="row no-gutters">
          <LateralSection />
          {currentSection}
        </MainStyled>
      </CurrentUserContext.Provider>
    </CurrentChatContext.Provider>
  );
}