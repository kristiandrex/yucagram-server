import React, { useEffect, useCallback, Fragment } from 'react';
import { Chat, Message, State, User, DispatchI } from '../react-app-env';
import ListMessages from './ListMessages';
import MessageBox from './MessageBox';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from './Socket';

export default function CurrentChat() {
  const user = useSelector<State>((state) => state.user) as User;
  const current = useSelector<State>((state) => state.current.chat) as Chat;

  const dispatch = useDispatch<DispatchI>();

  const handleSendMessage = useCallback(async (value: string) => {
    const message: Message = {
      content: value,
      date: new Date().toString(),
      from: user._id as string,
      to: current.user._id,
    };

    try {
      socket.emit('SEND_MESSAGE', message, (response: Message) => {

        dispatch({
          type: 'ADD_CURRENT_MESSAGE',
          payload: {
            message: response,
            index: current.index
          }
        });

      });
    }

    catch (error) {
      console.error(error);
    }
  }, [current, user._id, dispatch]);

  useEffect(() => {
    socket.emit('OPEN_CHAT', current._id);
  }, [current.messages, current._id]);

  return (
    <Fragment>
      <ListMessages messages={current.messages} />
      <MessageBox handleSendMessage={handleSendMessage} />
    </Fragment>
  );
}