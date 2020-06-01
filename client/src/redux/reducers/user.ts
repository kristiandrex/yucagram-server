import { Reducer } from "redux";
import { User, ActionI, Chat } from "../../react-app-env";

const user: Reducer<(User | null), ActionI> = (state = null, action): (User | null) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;

    case 'ADD_CHAT':
      return <User>{
        ...state,
        chats: [action.payload, ...(<Chat[]>state?.chats)]
      }

    default:
      return state;
  }
}

export default user;