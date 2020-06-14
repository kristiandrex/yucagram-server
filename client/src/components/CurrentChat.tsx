import React, { useEffect } from 'react';
import { Chat, Message, State, User, DispatchI } from '../react-app-env';
import styled from 'styled-components';
import ProfileCard from './ProfileCard';
import ListMessages from './ListMessages';
import MessageBox from './MessageBox';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from './Socket';

const CurrentChatStyled = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;

  .list-messages {
    overflow-y: auto;

    .message-row {
      padding-bottom: 8px;
    }

    .message-row:first-child {
      padding-top: 8px;
    }
  }
`;

export default function CurrentChat() {
  const user = useSelector<State>((state) => state.user) as User;
  const current = useSelector<State>((state) => state.current.chat) as Chat;

  const dispatch = useDispatch<DispatchI>();

  const handleSendMessage = async (value: string) => {
    const message: Message = {
      content: value,
      date: new Date().toString(),
      from: user._id as string,
      to: current.user._id,
      room: current.room._id
    };


    try {
      socket.emit('SEND_MESSAGE', message, (response: Message) => {
        dispatch({
          type: 'ADD_CURRENT_MESSAGE',
          payload: {
            message: response,
            index: current.index
          }
        });
      });
    }

    catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    socket.emit('OPEN_CHAT', current._id);
  }, [current.room.messages, current._id]);

  return (
    <CurrentChatStyled className="col-9">
      <div className="shadow-sm">
        <ProfileCard user={current.user} />
      </div>
      <ListMessages messages={current.room.messages} />
      <MessageBox handleSendMessage={handleSendMessage} />
    </CurrentChatStyled>
  );
}