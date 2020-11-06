import React from 'react';
import { useSelector } from 'react-redux';
import Chat from './Chat';

export default function ListOfChats() {
  const chats = useSelector((state) => state.chats.collection);

  return (
    <div className='list-chats'>
      {
        chats.map((chat, index) =>
          <Chat
            key={chat._id}
            chat={chat}
            index={index}
          />
        )
      }
    </div>
  );
}