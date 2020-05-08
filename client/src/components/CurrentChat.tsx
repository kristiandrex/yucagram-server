import React, { FormEvent, useState, useRef, Fragment, useContext, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import axios from 'axios';
import '../styles/CurrentChat.css';
import { TokenContext } from './App';

interface Props {
  user: User | null;
  chats: Chat[];
}

export default function CurrentChat({ user, chats }: Props) {
  
  const [exists, setExists] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();

    const message = inputRef.current?.value;
  };

  const handleAddChat = async () => {
    try {
      const response = await axios.post('/chats', { user: user?._id }, { headers: { authorization: token.value } });
      console.log(response.data);
    }

    catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="current-chat h-100 col-9">
      <div className="bg-primary text-white">
        <ProfileCard
          alt={`Foto de ${user.username}`}
          avatar={user.avatar}
          username={user.username}
        />
      </div>
      {
        exists ? (
          <Fragment>
            <div className="list-messages p-2">
            </div>
            <div className="box-message">
              <form className="p-2 bg-white border-top" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Escribe un mensaje..."
                  ref={inputRef}
                />
                <button className="btn btn-link">
                  <i className="material-icons">send</i>
                </button>
              </form>
            </div>
          </Fragment>
        ) : (
            <div className="p-2 d-flex align-items-center justify-content-center">
              <div className="alert alert-secondary text-center">
                <h5 className="alert-heading">¿Quieres agregar este chat?</h5>
                <hr />
                <div>
                  <button
                    className="btn btn-outline-primary px-4"
                    onClick={handleAddChat}
                  >
                    Agregarlo
                </button>
                </div>
              </div>
            </div>
          )
      }
    </div>
  )
}