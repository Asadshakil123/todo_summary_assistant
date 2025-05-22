import { call, put, takeLatest } from 'redux-saga/effects';
import * as slackApi from '../../api/slackApi';
import {
	SEND_SLACK_SUMMARY_REQUEST,
	SEND_SLACK_SUMMARY_SUCCESS,
	SEND_SLACK_SUMMARY_FAILURE,
} from './slackSlice';

// Worker Saga
function* sendSlackSummarySaga() {
	try {
		const response = yield call(slackApi.sendSummaryToSlack);
		// Assuming backend returns a message like { message: "Summary sent to Slack!" }
		yield put({ type: SEND_SLACK_SUMMARY_SUCCESS, payload: response.message || 'Summary sent successfully!' });
	} catch (error) {
		// Backend might send error.response.data.message or just error.message
		yield put({ type: SEND_SLACK_SUMMARY_FAILURE, payload: error.response?.data?.message || error.message || 'Failed to send summary.' });
	}
}

// Watcher Saga
export function* watchSlackSagas() {
	yield takeLatest(SEND_SLACK_SUMMARY_REQUEST, sendSlackSummarySaga);
}