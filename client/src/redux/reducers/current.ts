import { Reducer } from 'redux';
import { ActionI, Current } from '../../react-app-env';

const initialState = {
  chat: null,
  user: null
}

const current: Reducer<Current, ActionI> = (state = initialState, action): Current => {
  switch (action.type) {
    case 'SET_CURRENT_CHAT':
      return {
        user: null,
        chat: action.payload
      };

    case 'SET_CURRENT_USER':
      return {
        user: action.payload,
        chat: null
      };

    default:
      return state;
  }
};

export default current;