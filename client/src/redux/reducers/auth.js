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
			...action.payload
		}
	}

	case types.SIGNOUT: {
		return {
			user: null,
			loading: false,
			token: null
		}
	}

	case types.SET_USER: {
		return {
			...state,
			user: action.payload
		};
	}

	default: {
		return state
	}
	}
}