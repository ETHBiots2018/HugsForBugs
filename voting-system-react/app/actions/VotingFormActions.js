import axios from 'axios';
import { push } from 'react-router-redux';
import {
	VOTING_FORM_TITLE_CHANGED,
	VOTING_FORM_DESCRIPTION_CHANGED,
	VOTING_FORM_MINIMUM_CHANGED
} from './types';
import { server } from '../config';

export const votingFormTitleChanged = (title) => {
	return {
		type: VOTING_FORM_TITLE_CHANGED,
		payload: title
	};
};

export const votingFormDescriptionChanged = (description) => {
	return {
		type: VOTING_FORM_DESCRIPTION_CHANGED,
		payload: description
	};
};

export const votingFormMinimumChanged = (minimum) => {
	return {
		type: VOTING_FORM_MINIMUM_CHANGED,
		payload: minimum
	};
};
