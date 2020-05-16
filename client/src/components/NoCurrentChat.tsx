import React, { useContext } from 'react';
import { User, setCurrentChatType } from '../react-app-env';
import ProfileCard from './ProfileCard';
import axios from 'axios';
import '../styles/CurrentChat.css';
import { TokenContext } from './App';

interface Props {
  user: User | null;
  setCurrentChat: setCurrentChatType;
  reloadChats: () => Promise<void>;
}

export default function NoCurrentChat({ user, setCurrentChat, reloadChats }: Props) {
  const { token } = useContext(TokenContext);

  const handleCreateChat = async () => {
    try {
      const response = await axios.post('/chats/', { user: user?._id }, { headers: { authorization: token } });
      setCurrentChat({ chat: response.data, user: null });
      
      await reloadChats();
    }

    catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="col-9 current-chat">
      <div className="bg-primary text-white">
        <ProfileCard user={user} />
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
      >
        <div className="alert alert-secondary text-center">
          <h4 className="alert-heading">¿Quieres agregar este chat?</h4>
          <hr />
          <button
            className="btn btn-outline-primary px-4"
            onClick={handleCreateChat}
          >
            Agregarlo
          </button>
        </div>
      </div>
    </div>
  );
}
