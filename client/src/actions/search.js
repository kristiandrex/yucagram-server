import types from 'types';
import fetch from 'helpers/fetch';

export default function search(value) {
  return async (dispatch, getState) => {
    const state = getState();

    if (value.length === 0) {
      dispatch({ type: types.CLEAR_SEARCH });
    }

    const chats = state.chats.collection.filter(chat => chat.user.username.includes(value));
    const ignore = chats.map(chat => chat.user.username);
    ignore.push(state.auth.user.username);

    try {
      const response = await fetch.post('/api/auth/search', { value, ignore });
      dispatch(setSearch(chats, response.data));
    }

    catch (error) {
      dispatch({ type: types.CLEAR_SEARCH });
      console.error(error);
    }
  };
}

function setSearch(chats, users) {
  return {
    type: types.SEARCH,
    payload: {
      chats,
      users,
      searching: true
    }
  };
}