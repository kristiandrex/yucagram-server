import types from '../types';
import addMessage from '../helpers/addMessage';

const initialState = {
  collection: [],
  current: {
    user: null,
    chat: null
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case types.SET_USER: {
      return {
        current: {
          chat: null,
          user: null
        },
        collection: action.payload.chats
      };
    }

    case types.SIGNIN: {
      return {
        ...state,
        collection: action.payload.user.chats
      };
    }

    case types.SIGNOUT: {
      return initialState;
    }

    case types.OPEN_CHAT: {
      let collection = state.collection;

      const index = action.payload.index;

      if (collection[index].unread > 0) {
        collection = [...state.collection];
        collection[index].unread = 0;
      }

      return {
        current: {
          user: null,
          chat: action.payload
        },
        collection
      };
    }

    case types.OPEN_USER: {
      return {
        ...state,
        current: {
          user: action.payload,
          chat: null
        }
      };
    }

    case types.CLOSE_CURRENT: {
      return {
        ...state,
        current: {
          user: null,
          chat: null
        }
      };
    }

    case types.ADD_CHAT: {
      return {
        ...state,
        collection: [
          action.payload,
          ...state.collection
        ]
      };
    }

    case types.DELETE_CHAT: {
      const collection = state.collection.slice();
      const deleted = collection.splice(action.payload, 1)[0];

      if (deleted._id === state.current.chat?._id) {
        return {
          current: {
            chat: null,
            user: null
          },
          collection
        };
      }

      return {
        ...state,
        collection
      };
    }

    case types.ADD_MESSAGE: {
      const collection = addMessage(state.collection, action.payload);
      collection[0].unread += 1;

      return {
        ...state,
        collection
      };
    }

    case types.ADD_CURRENT_MESSAGE: {
      const collection = addMessage(state.collection, action.payload);
      const chat = Object.assign({}, collection[0]);

      return {
        collection,
        current: {
          user: null,
          chat
        }
      };
    }

    default:
      return state;
  }
}