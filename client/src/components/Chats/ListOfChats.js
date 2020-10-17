import React, { useMemo } from 'react';
import Chat from './Chat';
import PropTypes from 'prop-types';

export default function ListOfChats({ chats, searching }) {
  const show = useMemo(() => (searching && chats.length > 0), [searching, chats.length]);

  return (
    <div className='list-chats'>
      {show && <div className='p-2 border-bottom font-weight-bold text-center'>Chats</div>}
      {
        chats.map((chat, index) => (
          <Chat
            key={chat._id}
            chat={chat}
            index={index}
          />
        ))
      }
    </div>
  );
}

ListOfChats.propTypes = {
  chats: PropTypes.array.isRequired,
  searching: PropTypes.bool.isRequired
};
