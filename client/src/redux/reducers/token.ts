import { ActionI } from "../../react-app-env";

const initialState = localStorage.getItem('token');

export default function reducer(state: string | null = initialState, action: ActionI): string | null {
   switch (action.type) {

      case 'SET_TOKEN': {
         window.localStorage.setItem('token', action.payload);
         return action.payload;
      }

      case 'SIGNIN': {
         window.localStorage.setItem('token', action.payload.token);
         return action.payload.token;
      }

      case 'SIGNOUT': {
         localStorage.removeItem('token');
         return null;
      }

      default:
         return state;
   }
}