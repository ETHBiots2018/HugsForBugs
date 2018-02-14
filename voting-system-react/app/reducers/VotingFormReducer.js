import {
	VOTING_FORM_TITLE_CHANGED,
	VOTING_FORM_DESCRIPTION_CHANGED,
	VOTING_FORM_MINIMUM_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
	title: '',
	description: '',
	minimum: 0
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case VOTING_FORM_TITLE_CHANGED:
			return {
				...state, 
				title: action.payload
			};
		case VOTING_FORM_DESCRIPTION_CHANGED:
			return {
				...state, 
				description: action.payload
			};
		case VOTING_FORM_MINIMUM_CHANGED:
			return {
				...state, 
				minimum: action.payload
			};
		default:
			return state;
	}
};
