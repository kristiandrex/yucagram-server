import { State, ActionI } from "../../react-app-env";
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

    case 'SET_CURRENT_CHAT': {
      const chats = state.chats.slice();
      chats[action.payload.index].unread = 0;

      return {
        ...state,
        current: {
          user: null,
          chat: action.payload
        },
        chats
      };
    }

    case 'SET_CURRENT_USER': {
      return {
        ...state,
        current: {
          user: action.payload,
          chat: null
        }
      };
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