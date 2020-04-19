import React, { useContext, useState } from 'react';
import ProfileCard from './ProfileCard';
import '../styles/CurrentChat.css';
import MessagePill from './MessagePill';
import { UserContext } from './App';

export default function CurrenChat() {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  const handleSubmitMessage = (event) => {
    event.preventDefault();
  };

  return (
    <div className='col-8 h-100 current-chat'>
      <div className='bg-primary text-white'>
        <ProfileCard avatar={user.avatar} alt={'Foto de ' + user.username} />
      </div>
      <div className='px-2 pt-2'>
        {messages.map((message) => (
          <MessagePill />
        ))}
      </div>
      <div className='p-2 bg-white border-top'>
        <form
          style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem' }}
          onSubmit={handleSubmitMessage}
        >
          <input type='text' placeholder='Escribe un mensaje...' className='form-control' />
          <button className='btn btn-link'>
            <i className='material-icons'>send</i>
          </button>
        </form>
      </div>
    </div>
  );
}
