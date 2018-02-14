import {
	GET_VOTINGS,
	GET_VOTINGS_SUCCESS,
	GET_VOTINGS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	votings: [],
	loading: false,
	error: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_VOTINGS:
			return {
				...state,
				loading: true,
				error: false
			};
		case GET_VOTINGS_SUCCESS:
			return {
				...state,
				votings: action.payload,
				loading: false,
			};
		case GET_VOTINGS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};
