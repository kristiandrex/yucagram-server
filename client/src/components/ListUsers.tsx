import React, { useContext } from 'react';
import ProfileCard from './ProfileCard';
import { ChatContext } from './Main';

interface Props {
  users: User[];
}

export default function ListUsers({ users }: Props) {
  const { setCurrentChat } = useContext(ChatContext);

  return (
    <div>
      {users.length > 0 && (
        <div className="p-2 text-center font-weight-bold border-bottom">Usuarios</div>
      )}

      {users.map(user => (
        <div 
          style={{ cursor: 'pointer' }} 
          key={user._id}
          onClick={() => {
            setCurrentChat(user);
          }}
        >
          <ProfileCard
            alt={`Foto de ${user.username}`}
            avatar={user.avatar}
            username={user.username}
          />
        </div>
      ))}
    </div>
  );
}
