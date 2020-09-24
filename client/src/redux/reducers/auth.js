import types from '../types';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNIN: {
      return {
        loading: false,
        user: {
          ...action.payload.user,
          edit: false
        },
        token: action.payload.token
      };
    }

    case types.SIGNOUT: {
      return {
        user: null,
        loading: false,
        token: null
      };
    }

    case types.SET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }

    case types.SET_AVATAR: {
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload,
          new: false
        }
      };
    }

    case types.OPEN_PROFILE: {
      return {
        ...state,
        user: {
          ...state.user,
          edit: true
        }
      };
    }

    case types.CLOSE_PROFILE: {
      return {
        ...state,
        user: {
          ...state.user,
          edit: false
        }
      };
    }

    default: {
      return state;
    }
  }
};