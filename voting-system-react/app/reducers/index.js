import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import AuthReducer from './AuthReducer';
import VotingFormReducer from './VotingFormReducer';
import VotingListReducer from './VotingListReducer';

export default combineReducers({
	routing: routerReducer,
	auth: AuthReducer,
	votingList: VotingListReducer,
	votingForm: VotingFormReducer
});
