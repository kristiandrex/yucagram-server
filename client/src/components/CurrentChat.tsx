import React, { useState, useCallback, memo, useEffect } from 'react';
import { Chat, Message, State, User } from '../react-app-env';
import styled from 'styled-components';
import ProfileCard from './ProfileCard';
import ListMessages from './ListMessages';
import MessageBox from './MessageBox';
import { useSelector } from 'react-redux';
import axios from 'axios';

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

function CurrentChat() {
  const token = useSelector((state: State) => state.token) as string;
  const user = useSelector((state: State) => state.user) as User;
  const currentChat = useSelector((state: State) => state.current.chat) as Chat;
  const [messages, setMessages] = useState<Message[]>(currentChat.room.messages || []);

  const handleSendMessage = useCallback(async (value: string) => {
    const message: Message = {
      content: value,
      date: new Date(),
      from: user._id as string,
      to: currentChat.user._id,
      room: currentChat.room._id
    };

    try {
      const response = await axios.post('/messages', message, { headers: { authorization: token } });
      setMessages([...messages, response.data]);
    }

    catch (error) {
      console.error(error);
    }

  }, [user, currentChat, token]);

  useEffect(() => {
    setMessages(currentChat.room.messages);
  }, [currentChat]);

  return (
    <CurrentChatStyled className="col-9">
      <div className="shadow-sm">
        <ProfileCard user={currentChat.user} />
      </div>
      <ListMessages messages={messages} />
      <MessageBox handleSendMessage={handleSendMessage} />
    </CurrentChatStyled>
  );
}

export default memo(CurrentChat);