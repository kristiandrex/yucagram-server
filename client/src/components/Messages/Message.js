import React, { useCallback, useState, useEffect, useRef, useContext } from 'react';
import { SocketContext } from 'components/Socket';
import MessagePill from './MessagePill';

export default function Message({ message }) {
  const [seen, setSeen] = useState(message.seen);
  const socket = useContext(SocketContext);
  const ref = useRef();

  const onIntersection = useCallback((entries, observer) => {
    const element = entries[0];

    if (element.isIntersecting) {
      observer.disconnect();
      
      socket.emit('MESSAGE_SEEN', message._id);

      setSeen(true);
    }
  }, [message, socket]);

  useEffect(() => {
    if (!seen) {
      const observer = new IntersectionObserver(onIntersection, { threshold: 1 });
      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, [seen, onIntersection]);

  return <MessagePill message={message} ref={ref} />
}
