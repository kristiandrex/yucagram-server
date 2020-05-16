import React, { useRef, FormEvent, useContext, useState, useEffect } from 'react';
import { Chat } from '../react-app-env';
import ProfileCard from './ProfileCard';
import '../styles/CurrentChat.css';
import { UserContext } from './App';

interface Props {
  chat: Chat;
  reloadChats: () => Promise<void>;
}

export default function CurrentChat({ chat, reloadChats }: Props) {
  const { user } = useContext(UserContext);
  const [value, setValue] = useState<string>('');
  const messageRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();

    const message: string = messageRef.current?.value.trim() as string;

    if (message?.length <= 0) {
      return;
    }

    const data = {
      from: user?._id,
      to: chat.user._id,
      content: message,
      date: new Date()
    };
  };

  useEffect(() => {
    setValue('');
  }, [chat]);

  return (
    <div className="col-9 current-chat">
      <div className="bg-primary text-white">
        <ProfileCard user={chat.user} />
      </div>
      <div className="list-messages">
      </div>
      <div className="p-2 border-top">
        <form
          className="d-flex align-items-center"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            ref={messageRef}
            className="form-control"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <button className="btn btn-link">
            <i className="material-icons">send</i>
          </button>
        </form>
      </div>
    </div>
  );
}