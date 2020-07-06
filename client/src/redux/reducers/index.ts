import user from './user';
import chats from './chats';
import results from './results';
import token from './token';

import { combineReducers } from 'redux';

export default combineReducers({
  user,
  chats,
  results,
  token
});