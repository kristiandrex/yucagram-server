import { User, ActionI } from "../../react-app-env";

export default function reducer(state: User | null = null, action: ActionI): User | null {
   switch (action.type) {
      case 'SET_USER': {
         return action.payload
      }

      case 'SIGNIN': {
         return action.payload.user;
      }

      case 'SIGNOUT': {
         return null;
      }

      default:
         return state;
   }
}