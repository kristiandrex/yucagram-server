import axios from 'axios';
import types from '../types';

export default function newMessage(message) {
  return async (dispatch, getState) => {

    const state = getState();
    const current = state.chats.current;
    const index = state.chats.collection.findIndex(chat => chat.user._id === message.from);

    if (current.chat !== null && current.chat.user._id === message.from) {
      dispatch({
        type: types.ADD_CURRENT_MESSAGE,
        payload: {
          message,
          index
        }
      });
    }

    if (index === -1) {
      const response = await axios.get(`/chats/${message.to}/${message.from}`, {
        headers: { Authorization: state.token }
      });

      dispatch({
        type: types.ADD_CHAT,
        payload: response.data
      });
    }

    dispatch({
      type: types.ADD_MESSAGE,
      payload: {
        message,
        index
      }
    });

  };
}
