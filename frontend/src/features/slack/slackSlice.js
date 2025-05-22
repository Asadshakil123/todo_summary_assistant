// Action Types
export const SEND_SLACK_SUMMARY_REQUEST = 'slack/sendSlackSummaryRequest';
export const SEND_SLACK_SUMMARY_SUCCESS = 'slack/sendSlackSummarySuccess';
export const SEND_SLACK_SUMMARY_FAILURE = 'slack/sendSlackSummaryFailure';
export const CLEAR_SLACK_MESSAGE = 'slack/clearSlackMessage';

// Action Creators
export const sendSlackSummaryRequest = () => ({ type: SEND_SLACK_SUMMARY_REQUEST });
export const sendSlackSummarySuccess = (message) => ({ type: SEND_SLACK_SUMMARY_SUCCESS, payload: message });
export const sendSlackSummaryFailure = (error) => ({ type: SEND_SLACK_SUMMARY_FAILURE, payload: error });
export const clearSlackMessage = () => ({ type: CLEAR_SLACK_MESSAGE });


// Initial State
const initialState = {
	message: null,
	success: null, // true for success, false for failure
	loading: false,
};

// Reducer
const slackReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEND_SLACK_SUMMARY_REQUEST:
			return { ...state, loading: true, message: null, success: null };
		case SEND_SLACK_SUMMARY_SUCCESS:
			return { ...state, loading: false, message: action.payload, success: true };
		case SEND_SLACK_SUMMARY_FAILURE:
			return { ...state, loading: false, message: action.payload, success: false };
		case CLEAR_SLACK_MESSAGE:
			return { ...state, message: null, success: null };
		default:
			return state;
	}
};

export default slackReducer;

// Selectors
export const selectSlackMessage = (state) => state.slack.message;
export const selectSlackSuccess = (state) => state.slack.success;
export const selectSlackLoading = (state) => state.slack.loading;