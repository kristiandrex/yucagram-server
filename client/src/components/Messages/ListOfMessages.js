import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';
import MessageOwn from './MessageOwn';

export default function ListOfMessages() {
  const user = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chats.current.messages);

  return (
    <div className='messages px-2'>
      {
        messages.map((message, index) =>
          user._id === message.from
            ? <MessageOwn key={message._id} message={message} index={index} />
            : <Message key={message._id} message={message} />
        )
      }
    </div>
  );
}
