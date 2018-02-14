import axios from 'axios';
import {
	GET_VOTINGS_COUNT,
	GET_VOTINGS_COUNT_SUCCESS,
	GET_VOTINGS_COUNT_FAIL, 
	GET_VOTING, 
	GET_VOTING_SUCCESS, 
	GET_VOTING_FAIL
} from './types';
import { server } from '../config';

export const getVotingsCount = (clubId) => {
	return (dispatch) => {
		dispatch({ type: GET_VOTINGS_COUNT });
		
		
	};
};

const getVotingsCountSuccess = (dispatch, count) => {
	dispatch({
		type: GET_VOTINGS_COUNT_SUCCESS,
		payload: count
	});
};

export const getClubCampaignsFail = (error) => {
	return {
		type: GET_VOTINGS_COUNT_FAIL,
		payload: error
	};
};
