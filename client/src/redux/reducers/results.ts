import { Chat, User, ActionI } from "../../react-app-env";

interface Results {
   searching: boolean;
   chats: Chat[];
   users: User[];
}

const initialState: Results = {
   searching: false,
   chats: [],
   users: []
};

export default function reducer(state: Results = initialState, action: ActionI): Results {
   switch (action.type) {

      case 'SET_RESULTS': {
         return action.payload;
      }

      case 'CLEAR_RESULTS': {
         return initialState;
      }
      default:
         return state;
   }
}