import axios from 'axios';
import types from '../types';

export function verifyAuth() {
  const token = localStorage.getItem('token');

  return async (dispatch) => {
    if (token === null) {
      dispatch(signout());
    }

    else {
      try {
        const response = await axios.get('/api/signin/token', { headers: { Authorization: token } });
        dispatch(signin(response.data, token));
      }

      catch (error) {
        dispatch(signout());
        console.warn(error);
      }
    }
  };
}

export function signin(user, token) {
  localStorage.setItem('token', token);

  return {
    type: types.SIGNIN,
    payload: {
      user,
      token
    }
  };
}

export function signout() {
  localStorage.removeItem('token');
  return { type: types.SIGNOUT };
}

export async function changeAvatar(payload) {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post('/api/auth/upload/avatar', payload, { headers: { Authorization: token } });
    return { type: types.SET_AVATAR, payload: response.data };
  }

  catch (error) {
    console.error(error);
  }
}

export function openProfile() {
  return { type: types.OPEN_PROFILE };
}

export function closeProfile() {
  return { type: types.CLOSE_PROFILE };
}