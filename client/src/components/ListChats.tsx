import React, { Fragment } from 'react';
import { Chat, setCurrentChatType } from '../react-app-env';
import ProfileCard from './ProfileCard';

interface Props {
  chats: Chat[];
  setCurrentChat: setCurrentChatType;
}

export default function ListChats({ chats, setCurrentChat }: Props) {

  return (
    <Fragment>
      {
        chats.map(chat => (
          <div
            key={chat._id}
            style={{ cursor: 'pointer' }}
            onClick={() => setCurrentChat({ chat, user: null })}
          >
            <ProfileCard user={chat.user} />
          </div>
        ))
      }
    </Fragment>
  );
}
