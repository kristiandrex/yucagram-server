import ajax from 'helpers/ajax';
import types from '../types';

export function verifyAuth() {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    if (token === null) {
      return dispatch(signout());
    }

    dispatch(signinToken());
  };
}

function signinToken() {
  const token = localStorage.getItem('token');

  return async (dispatch) => {
    const response = await ajax.get('/api/signin/token');

    dispatch(actionSignin({ user: response.data, token }));
  }
}

export function signin(data) {
  return async (dispatch) => {
    const response = await ajax.post('/api/signin', data);
    
    localStorage.setItem('token', response.data.token);

    dispatch(actionSignin(response.data));
  };
}

function actionSignin({ user, token }) {
  return {
    type: types.SIGNIN,
    payload: { user, token }
  }
}

export function signout() {
  localStorage.removeItem('token');

  return { type: types.SIGNOUT };
}

export async function changeAvatar(data) {
  try {
    const response = await ajax.post('/api/auth/upload/avatar', data);

    return {
      type: types.SET_AVATAR,
      payload: response.data
    };
  }

  catch (error) {
    console.error(error);
  }
}

export function defaultAvatar() {
  return async (dispatch) => {
    try {
      await ajax.post('/api/auth/upload/avatar');
      dispatch({ type: types.DEFAULT_AVATAR });
    }

    catch (error) {
      console.error(error);
    }
  };
}

export function openProfile() {
  return { type: types.OPEN_PROFILE };
}

export function closeProfile() {
  return { type: types.CLOSE_PROFILE };
}