import { Reducer } from "redux";
import { ActionI } from "../../react-app-env";

const initialState = window.localStorage.getItem('token');

const user: Reducer<(string | null), ActionI> = (state = initialState, action): (string | null) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.payload;

    case 'REMOVE_TOKEN':
      return null;

    default:
      return state;
  }
}

export default user;