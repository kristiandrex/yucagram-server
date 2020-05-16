import React from 'react';
import { ResultsType, setCurrentChatType } from '../react-app-env';
import ProfileCard from './ProfileCard';

interface Props {
  results: ResultsType;
  setCurrentChat: setCurrentChatType;
}

export default function ListResults({ results, setCurrentChat }: Props) {
  const isChatsEmpty: boolean = results.chats.length === 0;
  const isUsersEmpty: boolean = results.users.length === 0;

  const listChats = results.chats.map(chat => (
    <div
      key={chat._id}
      onClick={() => setCurrentChat({ chat, user: null })}
      style={{ cursor: 'pointer' }}
    >
      <ProfileCard user={chat.user} />
    </div>
  ));

  const listUsers = results.users.map(user => (
    <div
      key={user._id}
      style={{ cursor: 'pointer' }}
      onClick={() => setCurrentChat({ chat: null, user })}
    >
      <ProfileCard user={user} />
    </div>
  ));

  return (
    <div>
      {
        !isChatsEmpty && (
          <div className="p-2 text-center font-weight-bold border-bottom">
            Tus chats
          </div>
        )
      }
      {listChats}
      {
        !isUsersEmpty && (
          <div className="p-2 text-center font-weight-bold border-bottom">
            Usuarios
          </div>
        )
      }
      {listUsers}
      {
        isChatsEmpty && isUsersEmpty && (
          <div className="p-4 text-center font-italic">
            <span>No hay resultados</span>
          </div>
        )
      }
    </div>
  );
}