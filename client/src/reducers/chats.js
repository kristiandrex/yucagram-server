import types from 'types';

const initialState = {
  collection: [],
  current: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
      return { ...state, current: action.payload };
    }

    case types.CLOSE_CURRENT: {
      return { ...state, current: null };
    }

    case types.ADD_CHAT: {
      return {
        ...state,
        collection: [action.payload, ...state.collection]
      };
    }

    case types.DELETE_CHAT: {
      const collection = [...state.collection];
      const deleted = collection.splice(action.payload, 1)[0];

      if (deleted._id === state.current?._id) {
        return { current: null, collection };
      }

      return { ...state, collection };
    }

    case types.ADD_MESSAGE: {
      return { ...state, collection: action.payload };
    }

    case types.ADD_CURRENT_MESSAGE: {
      return {
        collection: action.payload,
        current: action.payload[0]
      };
    }

    default:
      return state;
  }
}