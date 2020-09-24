import auth from './auth';
import chats from './chats';
import results from './results';

import { combineReducers } from 'redux';

export default combineReducers({
  chats,
  results,
  auth
});