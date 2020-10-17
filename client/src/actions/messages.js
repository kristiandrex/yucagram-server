import { addChat } from './chats';
import types from 'types';

export function addIncomingMessage(message) {
  return (dispatch, getState) => {
    const collection = getState().chats.collection;
    const index = collection.findIndex(chat => chat.user._id === message.from);

    if (index === -1) {
      return dispatch(addChat(message.from));
    }

    dispatch(addMessage(message, index));
  };
}

export function addMessage(message, index = 0) {
  return (dispatch, getState) => {
    const current = getState().chats.current;
    const collection = getState().chats.collection.slice();

    const initialChat = index === 0
      ? collection[0]
      : collection.splice(index, 1)[0];

    let unread, type;

    if (index === 0 && current !== null) {
      unread = initialChat.unread;
      type = types.ADD_CURRENT_MESSAGE;
    }

    else {
      unread = initialChat.unread + 1;
      type = types.ADD_MESSAGE;
    }

    const newChat = {
      ...initialChat,
      messages: [...initialChat.messages, message],
      unread
    }

    if (index === 0) {
      collection[0] = newChat;
    }

    else {
      collection.unshift(newChat);
    }

    dispatch({ type, payload: collection });
  }
}

export function messageSeen(data) {
  return (dispatch, getState) => {
    
  }
}