import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from 'components/Socket';
import { addChat } from 'actions/chats';
import { addMessage } from 'actions/messages';

export default function MessageBox() {
  const [value, setValue] = useState('');
  const current = useSelector((state) => state.chats.current);
  const user = useSelector((state) => state.auth.user);

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value.trim().length === 0) {
      return;
    }

    const data = {
      content: value,
      date: new Date(),
      from: user._id,
      to: current.user._id,
    };

    socket.emit('SEND_MESSAGE', data, (message) => {
      if (current.index === -1) {
        return dispatch(addChat(data.to));
      }

      dispatch(addMessage(message));
    });

    setValue('');
  };

  const handleChange = (event) => setValue(event.target.value);

  return (
    <form className='messages-box p-2 border-top' onSubmit={handleSubmit}>
      <input
        type='text'
        className='form-control'
        placeholder='Escribe un mensaje'
        value={value}
        onChange={handleChange}
      />
      <button
        type='submit'
        className='btn btn-outline-primary ml-2'
      >
        <span className='material-icons'>send</span>
      </button>
    </form>
  );
}