import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import MessagePill from './MessagePill';
import MessageState from './MessageState';
import { SocketContext } from 'components/Socket';
import { messageSeen } from 'actions/messages';

export default function MessageOwn({ message }) {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const onMessageSeen = (data) => {
      if (data._id === message._id) {
        dispatch(messageSeen(message));
      }
    };

    if (!message.seen) {
      socket.on('MESSAGE_SEEN', onMessageSeen);
    }
  }, [dispatch, message, socket]);

  return (
    <MessagePill message={message} key={message._id} own>
      <MessageState seen={message.seen} />
    </MessagePill>
  )
}

MessageOwn.propTypes = {
  message: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}