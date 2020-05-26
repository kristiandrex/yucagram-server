import React, { useContext, SetStateAction, Dispatch } from 'react';
import { User, Chat } from '../react-app-env';
import ProfileCard from './ProfileCard';
import styled from 'styled-components';
import { SocketContext, TokenContext } from '../context';

interface Props {
  currentUser: User;
  setCurrentChat: Dispatch<SetStateAction<Chat | null>>;
}

const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

export default function CurrentUser({ currentUser }: Props) {
  const { token } = useContext(TokenContext);
  const socket = useContext(SocketContext);

  const handleClick = async () => {
    socket?.emit('addChat', { token, userID: currentUser._id }, (response: Chat) => {

      console.log(response);

    });
  };

  return (
    <StyledDiv className="col-9">
      <ProfileCard user={currentUser} />
      <div className="d-flex align-items-center justify-content-center">
        <div className="card text-center shadow-sm">
          <div className="card-header bg-white">
            <h4>¿Quieres agregar este chat?</h4>
          </div>
          <div className="card-body">
            <button className="btn btn-primary" onClick={handleClick}>Agregar</button>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
}
