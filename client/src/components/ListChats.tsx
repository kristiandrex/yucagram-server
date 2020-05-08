import React, { useContext } from 'react';
import ProfileCard from './ProfileCard';
import { ChatContext } from './Main';

interface Props {
  usersCount: number;
  chats: Chat[]
}

export default function ListChats({ usersCount, chats }: Props) {
  const { setCurrentChat } = useContext(ChatContext);

  return (
    <div>
      {usersCount > 0 && chats.length > 0 && (
        <div className="p-2 text-center font-weight-bold border-bottom">Tus chats</div>
      )}
      {chats.map(chat => (
        <div 
          style={{ cursor: 'pointer' }} 
          key={chat._id} 
          onClick={() => {
            setCurrentChat(chat.user)
          }}
        >
          <ProfileCard
            alt={`Foto de ${chat.user.username}`}
            avatar={chat.user.avatar}
            username={chat.user.username}
          />
        </div>
      ))}
    </div>
  );
}
