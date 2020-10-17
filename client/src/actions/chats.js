import fetch from 'helpers/fetch';
import types from '../types';

export function deleteChat(_id, index) {
  return (dispatch) => {
    fetch.delete(`/api/auth/chats/${_id}`)
      .then(() => dispatch({ type: types.DELETE_CHAT, payload: index }))
      .catch((error) => console.error(error));
  };
}

export function openChat(chat, index = 0) {
  chat.index = index;
  return { type: types.OPEN_CHAT, payload: chat };
}

export function addChat(user) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch.post('/api/auth/chats', { user });
      dispatch({ type: types.ADD_CHAT, payload: response.data });

      const current = getState().chats.current?.user._id;

      if (current === user) {
        dispatch(openChat(response.data));
      }
    }

    catch (error) {
      console.error(error);
    }
  };
}