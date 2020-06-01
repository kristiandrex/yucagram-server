import { combineReducers } from "redux";
import user from './user'
import token from './token';
import current from './current';

export default combineReducers({
  user,
  token,
  current
});