import React, { memo } from 'react';
import { Message } from '../react-app-env';

interface Props {
  message: Message;
}

function MessagePill({ message }: Props) {
  return (
    <div className="message-row d-flex">
      <div className="message-pill shadow-sm py-2 px-3 rounded-pill bg-white">
        {message.content}
      </div>
    </div>
  );
}

export default memo(MessagePill);