import React, { useContext, useState, useCallback, useRef } from 'react';
import { Chat, Message } from '../react-app-env';
import styled from 'styled-components';
import ProfileCard from './ProfileCard';
import { UserContext, SocketContext, TokenContext } from '../context';
import ListMessages from './ListMessages';
import MessageBox from './MessageBox';

interface Props {
  currentChat: Chat;
}

const StyledDiv = styled.div`
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

export default function CurrentChat({ currentChat }: Props) {
  const { user } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const { token } = useContext(TokenContext);
  const [messages, setMessages] = useState<Message[]>(currentChat.room.messages || []);
  const listMessagesRef = useRef<HTMLDivElement>(null);


  const handleSendMessage = useCallback((value: string) => {
    const message: Message = {
      content: value,
      date: new Date(),
      from: user?._id as string,
      to: currentChat.user._id,
      room: currentChat.room._id
    };

    socket?.emit('sendMessage', { token, message }, (response: Message) => {
      setMessages([...messages, response]);
    });

  }, [user, currentChat, token, messages, socket]);

  return (
    <StyledDiv className="col-9">
      <div className="shadow-sm">
        <ProfileCard user={currentChat.user} />
      </div>
      <ListMessages messages={messages}/>
      <MessageBox handleSendMessage={handleSendMessage} />
    </StyledDiv>
  );
}