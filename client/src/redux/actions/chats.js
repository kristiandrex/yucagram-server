import axios from 'axios';
import types from '../types';

export function deleteChat(_id, index) {
  const token = localStorage.getItem('token');
  
  return async (dispatch) => {
    await axios.delete(`/api/chats/${_id}`, { headers: { Authorization: token } });

    dispatch({
      type: types.DELETE_CHAT,
      payload: index
    });
  };
}

export function openChat(chat, index) {
  // const socket = Socket.connect();

  // if (chat.unread > 0) {
  //   socket.emit('OPEN_CHAT', chat._id);
  // }

  chat.index = index;

  return {
    type: types.OPEN_CHAT,
    payload: chat
  };
}

export function addUser(user) {
  const token = localStorage.getItem('token');

  return async (dispatch) => {
    try {
      const response = await axios.post('/api/auth/chats', { user }, { headers: { authorization: token } });

      dispatch({ type: types.CLEAR_SEARCH });

      dispatch({
        type: types.ADD_CHAT,
        payload: response.data
      });

      dispatch({
        type: types.OPEN_CHAT,
        payload: {
          ...response.data,
          index: 0
        }
      });
    }

    catch (error) {
      console.error(error);
    }
  };
}