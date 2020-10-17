import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Lateral from './Lateral/Lateral';
import InitialAvatar from './Profile/InitialAvatar';
import Current from './Current/Current';
import { SocketContext } from './Socket';
import { addIncomingMessage, messageSeen } from 'actions/messages';

const StyledSession = styled.div`
  .no-outline {
    outline: none;
  }

  .dropdown-toggle {
    outline: none;
    box-shadow: none;
    color: #212529;

    &::after {
      display: none;
    }
  }
`;

export default function Screen() {
  const isNew = useSelector((state) => state.auth.user.new);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('SEND_MESSAGE', (message) => dispatch(addIncomingMessage(message)));
  }, [socket, dispatch]);

  if (isNew) {
    return <InitialAvatar />;
  }

  return (
    <StyledSession className='row no-gutters h-100'>
      <Lateral />
      <Current />
    </StyledSession>
  );
}