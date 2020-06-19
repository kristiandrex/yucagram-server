import { State, ActionI, Chat } from "../../react-app-env";
import sortChats from "../helpers/sortChats";

const initial: State = {
  chats: [],
  current: {
    chat: null,
    user: null
  },
  results: {
    chats: [],
    users: []
  },
  token: window.localStorage.getItem('token'),
  user: null,
  searching: false
};

export default function reducer(state: State = initial, action: ActionI): State {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload,
        chats: action.payload.chats
      };
    }

    case 'SET_TOKEN': {
      window.localStorage.setItem('token', action.payload);

      return {
        ...state,
        token: action.payload
      }
    }

    case 'SIGNIN': {
      window.localStorage.setItem('token', action.payload.token);

      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        chats: action.payload.user.chats
      }
    }

    case 'SIGNOUT': {
      window.localStorage.removeItem('token');

      return {
        ...initial,
        token: null
      }
    }

    case 'SET_CURRENT_CHAT': {
      let chats: Chat[] = state.chats;

      const index: number = action.payload.index;

      if(chats[index].unread > 0) {
        chats = state.chats.slice();
        chats[index].unread = 0;
      }

      return {
        ...state,
        current: {
          user: null,
          chat: action.payload.chat
        },
        chats,
        searching: false,
        results: {
          chats: [],
          users: []
        }
      };
    }

    case 'SET_CURRENT_USER': {
      return {
        ...state,
        current: {
          user: action.payload,
          chat: null
        },
        searching: false,
        results: {
          chats: [],
          users: []
        }
      };
    }

    case 'CLOSE_CURRENT': {
      return {
        ...state,
        current: {
          user: null,
          chat: null
        }
      }
    }

    case 'ADD_CHAT': {
      return {
        ...state,
        results: {
          chats: [],
          users: []
        },
        chats: [
          action.payload,
          ...state.chats
        ]
      };
    }

    case 'SET_RESULTS': {
      return {
        ...state,
        results: action.payload.results,
        searching: action.payload.searching
      };
    }

    case 'CLEAR_RESULTS': {
      return {
        ...state,
        searching: false,
        results: {
          users: [],
          chats: []
        }
      };
    }

    case 'ADD_CURRENT_MESSAGE': {
      const chats = sortChats(state.chats, action.payload.index, action.payload.message);
      const chat = Object.assign({}, chats[0]);

      return {
        ...state,
        chats,
        current: {
          user: null,
          chat
        }
      }
    }

    case 'ADD_MESSAGE': {
      const chats = sortChats(state.chats, action.payload.index, action.payload.message);
      chats[0].unread += 1;

      return {
        ...state,
        chats
      }
    }

    default:
      return state;
  }
}