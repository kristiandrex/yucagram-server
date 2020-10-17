import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Message from './Message';
import MessageOwn from './MessageOwn';

export default function ListOfMessages({ messages }) {
  const user = useSelector((state) => state.auth.user);

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

ListOfMessages.propTypes = {
  messages: PropTypes.array.isRequired
};